import { SearchForm } from '@/components/SearchForm';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookList from './_components/BookList';
import { searchTankobon } from './_lib/searchTotal';

type Props = {
  searchParams: Promise<{
    q?: string;
    page?: string;
    hits?: string;
  }>;
};

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: Props): Promise<Metadata> {
  const searchParams = await searchParamsPromise;
  const q = searchParams.q;
  if (!q) {
    return {};
  }
  return {
    title: `[${q}] の検索結果`,
  };
}

const Page = async ({ searchParams: searchParamsPromise }: Props) => {
  const searchParams = await searchParamsPromise;
  const q = searchParams.q;
  if (!q) {
    notFound();
  }
  const page = +(searchParams.page ?? 1);
  const hits = +(searchParams.hits ?? 30);

  const res = await searchTankobon(q, page, hits);
  if (!res) {
    return <p>エラー</p>;
  }
  const { Items: books } = res;

  const Result = () => (
    <section className="flex flex-col gap-4">
      <BookList books={books} />
    </section>
  );

  const NoResult = () => {
    return (
      <section className="p-4 text-center">
        <p>
          本が見つかりませんでした。キーワードを変えて検索してみてください。
        </p>
      </section>
    );
  };

  return (
    <>
      <section className="grid place-items-center p-4">
        <SearchForm />
      </section>
      <h1 className="text-center">[{q}] の検索結果</h1>
      {books?.length ? <Result /> : <NoResult />}
    </>
  );
};

export default Page;
