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
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BookList from './_components/BookList';
import { getSearchParams } from './_lib/getSearchParams';
import { searchTankobon } from './_lib/searchBooks';

type Props = {
  searchParams: Promise<{
    searchWord?: string;
    page?: string;
    hits?: string;
  }>;
};

export async function generateMetadata({
  searchParams: searchParamsPromise,
}: Props): Promise<Metadata> {
  const searchParams = await searchParamsPromise;
  const searchWord = searchParams.searchWord;
  if (!searchWord) {
    return {};
  }
  const page = +(searchParams.page ?? 1);
  const hits = +(searchParams.hits ?? 10);
  const res = await searchTankobon(searchWord, page, hits);
  if (!res) {
    return {};
  }
  const { first, last, count } = res;
  return {
    title: `[${searchWord}] の検索結果 (${first}-${last}件 / 全${count}件)`,
  };
}

const Page = async ({ searchParams: searchParamsPromise }: Props) => {
  const searchParams = await searchParamsPromise;
  const searchWord = searchParams.searchWord;
  if (!searchWord) {
    notFound();
  }
  const page = +(searchParams.page ?? 1);
  const hits = +(searchParams.hits ?? 30);

  const res = await searchTankobon(searchWord, page, hits);
  if (!res) {
    return <p>エラー</p>;
  }
  const { Items: books, pageCount } = res;

  return (
    <>
      <section className="p-4 grid place-items-center">
        <SearchForm />
      </section>
      <h1 className="text-center">[{searchWord}] の検索結果</h1>
      <section className="flex flex-col gap-4">
        <BookList books={books} />
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/books/search/?${getSearchParams({
                    ...searchParams,
                    page: page - 1,
                  }).toString()}`}
                />
              </PaginationItem>
            )}
            {page > 2 && (
              <PaginationItem>
                <PaginationLink
                  href={`/books/search/?${getSearchParams({
                    ...searchParams,
                    page: 1,
                  }).toString()}`}
                >
                  1
                </PaginationLink>
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
                  <PaginationLink
                    href={`/books/search/?${getSearchParams({
                      ...searchParams,
                      page: i,
                    }).toString()}`}
                    isActive={i === page}
                  >
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
                <PaginationLink
                  href={`/books/search/?${getSearchParams({
                    ...searchParams,
                    page: pageCount,
                  }).toString()}`}
                >
                  {pageCount}
                </PaginationLink>
              </PaginationItem>
            )}
            {page < pageCount && (
              <PaginationItem>
                <PaginationNext
                  href={`/books/search/?${getSearchParams({
                    ...searchParams,
                    page: page + 1,
                  }).toString()}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      </section>
    </>
  );
};

export default Page;
