import { Item } from '@/types/RakutenBooksTotalSearchApi';
import BookCard from './BookCard';

type Props = {
  books: Item[];
};
const BookList = ({ books }: Props) => {
  return (
    <ul className="flex flex-wrap justify-center gap-4 p-4">
      {books.map((book) => (
        <li key={book.isbn}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
};

export default BookList;
