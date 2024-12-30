import { Book } from '@/types/RakutenBooksSearchApi';
import BookCard from './BookCard';

type Props = {
  books: Book[];
};
const BookList = ({ books }: Props) => {
  return (
    <ul className="flex flex-wrap gap-4 justify-center p-4">
      {books.map((book) => (
        <li key={book.isbn}>
          <BookCard book={book} />
        </li>
      ))}
    </ul>
  );
};

export default BookList;
