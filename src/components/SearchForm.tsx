'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { getSearchParams } from '../app/books/search/_lib/getSearchParams';

const formSchema = z.object({
  q: z.string().min(2, {
    message: '検索キーワードは2文字以上入力してください',
  }),
});

export function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: searchParams.get('q') ?? '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.push(`/books/search?${getSearchParams(values)}`);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-4 space-y-8"
      >
        <FormField
          control={form.control}
          name="q"
          render={({ field }) => (
            <FormItem>
              <FormLabel>キーワード検索</FormLabel>
              <FormControl>
                <Input placeholder="タイトルや著者名で検索" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">検索</Button>
      </form>
    </Form>
  );
}
