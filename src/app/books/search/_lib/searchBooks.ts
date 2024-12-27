import { Item, RakutenBooksSearchApiParams } from "@/types/RakutenBooksSearchApiParams";
import { getSearchParams } from "./getSearchParams";

export async function searchBooks(
  searchWord: string,
  page?: number,
  hits?: number
) {
  const params: RakutenBooksSearchApiParams = {
    applicationId: process.env.APPLICATION_ID ?? "",
    formatVersion: 2,
    size: 0,
    sort: "-releaseDate",
    booksGenreId: "001",
    title: searchWord,
    page,
    hits,
  }
  const searchParams = getSearchParams(params as Record<string, number | string>)
  const baseUrl = "https://app.rakuten.co.jp/services/api/BooksBook/Search/20170404"
  const url = `${baseUrl}?${searchParams.toString()}`
  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error("fetch failed")
    }
    const json = await res.json();
    return json.Items as Item[];
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.error(e.message)
    } else {
      console.error(e);
    }
    return [];
  }
}
