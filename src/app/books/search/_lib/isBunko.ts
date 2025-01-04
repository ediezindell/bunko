import { GENRE_BUNKO, Item } from '@/types/RakutenBooksTotalSearchApi';

export const isBunko = (book: Item) =>
  book.booksGenreId
    .split('/')
    .some((genreId) => genreId.startsWith(GENRE_BUNKO));
