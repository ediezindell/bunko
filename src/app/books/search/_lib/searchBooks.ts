import {
  RakutenBooksSearchApiParams,
  RakutenBooksSearchApiResponse,
} from '@/types/RakutenBooksSearchApiParams';
import { getSearchParams } from './getSearchParams';

export async function searchBooks(
  searchWord: string,
  page: number,
  hits: number,
) {
  const params = {
    applicationId: process.env.APPLICATION_ID ?? '',
    affiliateId: process.env.AFFILIATE_ID ?? '',
    formatVersion: 2,
    size: 0,
    sort: '-releaseDate',
    booksGenreId: '001',
    title: searchWord,
    page,
    hits,
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
