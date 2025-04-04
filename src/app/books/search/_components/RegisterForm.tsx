'use client';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Book } from '@/types/RakutenBooksSearchApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { registerNotification } from '../_lib/registerNotification';

const formSchema = z.object({
  email: z.string().min(1, {
    message: 'メールアドレスを入力してください',
  }),
});

type Props = Pick<Book, 'isbn' | 'title'>;

const RegisterForm = ({ isbn, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await registerNotification(values.email, isbn, title);
      alert('登録が完了しました');
      setIsOpen(false);
      setIsRegistered(true);
    } catch (e) {
      alert('何かしらのエラーが発生しました');
      console.error(e);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          onClick={() => setIsOpen(true)}
          disabled={isRegistered}
        >
          {isRegistered ? 'お知らせ登録済み' : '文庫化お知らせ登録'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>メール通知登録</DialogTitle>
          <DialogDescription className="pt-2">
            「{title}」の文庫化が決定した際にメールでお知らせします。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>通知先アドレス</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      required
                      placeholder="user@example.com"
                      autoFocus
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose
                className={cn(buttonVariants({ variant: 'outline' }))}
              >
                キャンセル
              </DialogClose>
              <Button type="submit">登録する</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterForm;
