import { SearchForm } from '@/components/SearchForm';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { GENRE_BUNKO } from '@/types/RakutenBooksTotalSearchApi';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookList from './_components/BookList';
import { getSearchParams } from './_lib/getSearchParams';
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
  const page = +(searchParams.page ?? 1);
  const hits = +(searchParams.hits ?? 10);
  const res = await searchTankobon(q, page, hits);
  if (!res) {
    return {};
  }
  const { first, last, count } = res;
  return {
    title: `[${q}] の検索結果 (${first}-${last}件 / 全${count}件)`,
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
  const { Items: books, pageCount } = res;

  const getLink = (p: number) =>
    `/books/search/?${getSearchParams({
      ...searchParams,
      page: p,
    }).toString()}`;

  return (
    <>
      <section className="grid place-items-center p-4">
        <SearchForm />
      </section>
      <h1 className="text-center">[{q}] の検索結果</h1>
      <section className="flex flex-col gap-4">
        <BookList
          books={books.filter(({ booksGenreId }) =>
            booksGenreId
              .split('/')
              .every((genreId) => !genreId.startsWith(GENRE_BUNKO)),
          )}
        />
        <Pagination className="">
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={getLink(page - 1)} />
              </PaginationItem>
            )}
            {page > 2 && (
              <PaginationItem>
                <PaginationLink href={getLink(1)}>1</PaginationLink>
              </PaginationItem>
            )}
            {page > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {new Array(3)
              .fill(undefined)
              .map((_, i) => page + i - 1)
              .filter((i) => 1 <= i && i <= pageCount)
              .map((i) => (
                <PaginationItem key={i}>
                  <PaginationLink href={getLink(i)} isActive={i === page}>
                    {i}
                  </PaginationLink>
                </PaginationItem>
              ))}
            {page + 2 < pageCount && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            {page + 1 < pageCount && (
              <PaginationItem>
                <PaginationLink href={getLink(pageCount)}>
                  {pageCount}
                </PaginationLink>
              </PaginationItem>
            )}
            {page < pageCount && (
              <PaginationItem>
                <PaginationNext href={getLink(page + 1)} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </section>
    </>
  );
};

export default Page;
