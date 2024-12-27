import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Item } from '@/types/RakutenBooksSearchApiParams';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { SearchForm } from './_components/SearchForm';
import { getSearchParams } from './_lib/getSearchParams';
import { searchBooks } from './_lib/searchBooks';
type Props = {
  searchParams: Promise<{
    searchWord?: string;
    page?: string;
    hits?: string;
  }>;
};

const BookCard = (props: { book: Item }) => {
  const { book } = props;
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg bg-white">
      <div className="relative h-48 w-full">
        <Image
          src={book.largeImageUrl}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-4 flex-grow">{book.author}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {['文庫あり', '映画化'].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            \{book.itemPrice}
          </span>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const Page = async ({ searchParams: searchParamsPromise }: Props) => {
  const searchParams = await searchParamsPromise;
  const searchWord = searchParams.searchWord;
  if (!searchWord) {
    notFound();
  }
  const page = +(searchParams.page ?? 1);
  const hits = +(searchParams.hits ?? 30);

  const res = await searchBooks(searchWord, page, hits);
  if (!res) {
    return <p>エラー</p>;
  }
  const { Items: books, first, last, count, pageCount } = res;

  return (
    <>
      <SearchForm />
      <h1>
        [{searchWord}] の検索結果 ({first}-{last}件 / 全{count}件)
      </h1>
      <ul className="flex flex-wrap gap-4">
        {books.map((book) => (
          <li key={book.isbn}>
            <BookCard book={book} />
          </li>
        ))}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={`/books/search/?${getSearchParams({ ...searchParams, page: page - 1 }).toString()}`}
            />
          </PaginationItem>
          {[1, 2, 3].map((i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={`/books/search/?${getSearchParams({ ...searchParams, page: i }).toString()}`}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              href={`/books/search/?${getSearchParams({ ...searchParams, page: pageCount }).toString()}`}
            >
              {pageCount}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`/books/search/?${getSearchParams({ ...searchParams, page: page + 1 }).toString()}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default Page;
