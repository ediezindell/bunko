import {
  GENRE_BOOK,
  RakutenBooksSearchApiParams,
  RakutenBooksSearchApiResponse,
  SIZE_BUNKO,
  SizeKey,
} from '@/types/RakutenBooksSearchApi';
import { getSearchParams } from './getSearchParams';

export async function searchBooks(
  title: string,
  page: number,
  hits: number,
  size: SizeKey,
  booksGenreId: string,
) {
  const params = {
    applicationId: process.env.APPLICATION_ID ?? '',
    affiliateId: process.env.AFFILIATE_ID ?? '',
    formatVersion: 2,
    sort: '-releaseDate',
    booksGenreId,
    title,
    page,
    hits,
    size,
  } satisfies RakutenBooksSearchApiParams;
  const searchParams = getSearchParams(params);
  const baseUrl =
    'https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404';
  const url = `${baseUrl}?${searchParams.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('fetch failed');
    }
    return (await res.json()) as RakutenBooksSearchApiResponse;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message);
    } else {
      console.error(e);
    }
  }
}

export async function searchBunko(
  searchWord: string,
  page: number,
  hits: number,
) {
  return searchBooks(searchWord, page, hits, SIZE_BUNKO, GENRE_BOOK);
}
