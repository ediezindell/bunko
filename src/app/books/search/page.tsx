import { notFound } from "next/navigation";
import { searchBooks } from "./_lib/searchBooks";
import { SearchForm } from "./_components/SearchForm"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { getSearchParams } from "./_lib/getSearchParams";
type Props = {
  searchParams: {
    searchWord?: string;
    page?: string;
    hits?: string;
  }
}

const Page = async ({ searchParams }: Props) => {
  const searchWord = searchParams.searchWord;
  if (!searchWord) {
    notFound();
  }
  const page = +(searchParams.page ?? 1);
  const hits = +(searchParams.hits ?? 30);

  const books = await searchBooks(searchWord, page, hits);

  return (
    <>
      <SearchForm />
      <h1>[{searchWord}] の検索結果</h1>
      <ul>
        {books.map((book) => <li key={book.isbn}>{book.title}({book.author})</li>)}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`/books/search/?${getSearchParams({ ...searchParams, page: page - 1 }).toString()}`} />
          </PaginationItem>
          {[1, 2, 3].map((i) => (
            <PaginationItem key={i}>
              <PaginationLink href={`/books/search/?${getSearchParams({ ...searchParams, page: i }).toString()}`}>{i}</PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`/books/search/?${getSearchParams({ ...searchParams, page: page + 1 }).toString()}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}

export default Page;
