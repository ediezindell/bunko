import { Item } from '@/types/RakutenBooksTotalSearchApi';
import { isBunko } from '../_lib/isBunko';
import BookCard from './BookCard';

type Props = {
  books: Item[];
};
const BookList = ({ books }: Props) => {
  const hasBunko = (book: Item) =>
    books.some(
      (b) => b.isbn !== book.isbn && b.title === book.title && !isBunko(b),
    );

  return (
    <ul className="flex flex-wrap justify-center gap-4 p-4">
      {books
        .filter((book) => !isBunko(book) || !hasBunko(book))
        .map((book) => (
          <li key={book.isbn}>
            <BookCard book={book} />
          </li>
        ))}
    </ul>
  );
};

export default BookList;
