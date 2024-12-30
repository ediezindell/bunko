import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { availabilityMap, Book } from '@/types/RakutenBooksSearchApi';
import Image from 'next/image';

type Props = {
  book: Book;
};
const BookCard = async ({ book }: Props) => {
  return (
    <div className="flex h-full w-80 flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 shadow-lg">
      <div className="relative h-48 w-full">
        <Image
          src={book.largeImageUrl}
          alt={book.title}
          fill
          className="object-contain hover:object-scale-down"
        />
      </div>
      <div className="flex flex-grow flex-col gap-2">
        <h2 className="flex-grow text-xl font-semibold">
          <span>{book.title}</span>
        </h2>
        <p className="text-gray-600">{book.author}</p>
        <p className="text-gray-600">
          {book.publisherName} {book.seriesName}
        </p>
        <div className="flex flex-wrap gap-2">
          {[book.size, availabilityMap[book.availability]].map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">
            {new Intl.NumberFormat('ja-JP', {
              style: 'currency',
              currency: 'JPY',
            }).format(book.itemPrice)}
          </span>
          <a
            target="_blank"
            href={book.affiliateUrl || book.itemUrl}
            className={cn(
              buttonVariants({
                variant: 'outline',
              }),
            )}
          >
            楽天ブックスで見る
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
