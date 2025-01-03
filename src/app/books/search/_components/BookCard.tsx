import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GENRE_BUNKO, Item } from '@/types/RakutenBooksTotalSearchApi';
import Image from 'next/image';
import Link from 'next/link';
import { searchBunko } from '../_lib/searchBooks';
import BunkoCard from '../bunko/_components/BookCard';

type Props = {
  book: Item;
};
const BookCard = async ({ book }: Props) => {
  const isBunko = book.booksGenreId
    .split('/')
    .some((genreId) => genreId.startsWith(GENRE_BUNKO));

  if (isBunko) {
    return (
      <BunkoCard
        book={{
          ...book,
          publisherName: '',
          seriesName: '',
          size: '文庫',
        }}
      />
    );
  }

  const bunkoRes = await searchBunko(book.title, 1, 30);
  const hasBunko = bunkoRes?.count ?? 0 > 0;

  return (
    <div className="flex h-full w-80 flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={book.largeImageUrl}
          alt={book.title}
          fill
          className="object-contain transition-all hover:scale-95"
        />
      </div>
      <div className="flex grow flex-col gap-2">
        <h2 className="grow text-xl font-semibold">
          <span>{book.title}</span>
        </h2>
        <p className="text-gray-600">
          <Link href={`/books/search?q=${book.author}`}>{book.author}</Link>
        </p>
        <p className="text-gray-600">{book.publisherName}</p>
        <div className="flex flex-wrap gap-2">
          {hasBunko ? (
            <span className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700">
              文庫化
            </span>
          ) : (
            ''
          )}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            {new Intl.NumberFormat('ja-JP', {
              style: 'currency',
              currency: 'JPY',
            }).format(book.itemPrice)}
          </span>
          {hasBunko ? (
            <Link
              href={`/books/search/bunko?title=${book.title}`}
              className={cn(buttonVariants())}
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
