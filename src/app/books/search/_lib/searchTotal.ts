import {
  GENRE_SHOSETSU,
  RakutenBooksTotalSearchApiParams,
  RakutenBooksTotalSearchApiResponse,
} from '@/types/RakutenBooksTotalSearchApi';

import { getSearchParams } from './getSearchParams';

export async function searchBooks(
  keyword: string,
  page: number,
  hits: number,
  booksGenreId: string,
) {
  const params = {
    applicationId: process.env.APPLICATION_ID ?? '',
    affiliateId: process.env.AFFILIATE_ID ?? '',
    formatVersion: 2,
    sort: '-releaseDate',
    booksGenreId,
    keyword,
    page,
    hits,
  } satisfies RakutenBooksTotalSearchApiParams;
  const searchParams = getSearchParams(params);
  const baseUrl =
    'https://app.rakuten.co.jp/services/api/BooksTotal/Search/20170404';
  const url = `${baseUrl}?${searchParams.toString()}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error('fetch failed');
    }
    return (await res.json()) as RakutenBooksTotalSearchApiResponse;
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message, keyword, page, hits, booksGenreId);
    } else {
      console.error(e);
    }
  }
}

export async function searchTankobon(
  title: string,
  page: number,
  hits: number,
) {
  return await searchBooks(title, page, hits, GENRE_SHOSETSU);
}
