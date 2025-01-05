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
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z.string().min(1, {
    message: 'メールアドレスを入力してください',
  }),
});

const RegisterForm = ({ title }: Pick<Book, 'isbn' | 'title'>) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">文庫化お知らせ登録</Button>
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
