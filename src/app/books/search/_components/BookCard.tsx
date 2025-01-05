import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Item } from '@/types/RakutenBooksTotalSearchApi';
import Link from 'next/link';
import { isBunko } from '../_lib/isBunko';
import { searchBunko } from '../_lib/searchBooks';
import BunkoCard from '../bunko/_components/BookCard';
import {
  CardBody,
  CardHeading,
  CardImage,
  CardLayout,
  CardParagraph,
  CardPrice,
  CardTags,
} from './BookLayout';

type Props = {
  book: Item;
};

const BookCard = async ({ book }: Props) => {
  if (isBunko(book)) {
    return (
      <BunkoCard
        book={{
          ...book,
          size: '文庫',
        }}
      />
    );
  }

  const bunkoRes = await searchBunko(book.title, 1, 30);
  const hasBunko = bunkoRes?.count ?? 0 > 0;

  return (
    <CardLayout>
      <CardImage {...book} />
      <CardBody>
        <CardHeading {...book} />
        <CardParagraph>
          <Link href={`/books/search?q=${book.author}`}>{book.author}</Link>
        </CardParagraph>
        <CardParagraph>{book.publisherName}</CardParagraph>
        <CardTags tags={hasBunko ? ['文庫化'] : []} />
        <div className="flex items-center justify-between">
          <CardPrice {...book} />
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
      </CardBody>
    </CardLayout>
  );
};

export default BookCard;
