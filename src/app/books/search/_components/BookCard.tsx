import { Book } from '@/types/RakutenBooksSearchApi';
import Image from 'next/image';
import Link from 'next/link';
import { searchBunko } from '../_lib/searchBooks';

type Props = {
  book: Book;
};
const BookCard = async ({ book }: Props) => {
  const bunkoRes = await searchBunko(book.title, 1, 30);
  const hasBunko = bunkoRes?.count ?? 0 > 0;

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg bg-white w-80">
      <div className="relative h-48 w-full">
        <Image
          src={book.largeImageUrl}
          alt={book.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-4 gap-2 flex-grow">
        <h2 className="text-xl font-semibold flex-grow">
          <span>{book.title}</span>
        </h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-gray-600">
          {book.publisherName} {book.seriesName}
        </p>
        <div className="flex flex-wrap gap-2">
          {hasBunko ? (
            <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
              文庫化
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            {new Intl.NumberFormat('ja-JP', {
              style: 'currency',
              currency: 'JPY',
            }).format(book.itemPrice)}
          </span>
          {hasBunko ? (
            <Link
              href={`/books/search/bunko?searchWord=${book.title}`}
              className="btn"
            >
              文庫を探す
            </Link>
          ) : (
            <p>文庫は未発売</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
