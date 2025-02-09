import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { availabilityMap, Book } from '@/types/RakutenBooksSearchApi';
import {
  CardBody,
  CardHeading,
  CardImage,
  CardLayout,
  CardParagraph,
  CardPrice,
  CardTags,
} from '../../_components/BookLayout';

type Props = {
  book: Pick<
    Book,
    | 'largeImageUrl'
    | 'author'
    | 'title'
    | 'itemPrice'
    | 'size'
    | 'availability'
    | 'itemUrl'
    | 'publisherName'
    | 'seriesName'
    | 'affiliateUrl'
  >;
};

const BookCard = async ({ book }: Props) => {
  return (
    <CardLayout>
      <CardImage {...book} />
      <CardBody>
        <CardHeading {...book} />
        <CardParagraph>{book.author}</CardParagraph>
        <CardParagraph>
          {book.publisherName} {book.seriesName}
        </CardParagraph>
        <CardTags tags={[book.size, availabilityMap[book.availability]]} />
        <div className="flex items-center justify-between">
          <CardPrice {...book} />
          <a
            target="_blank"
            href={book.affiliateUrl || book.itemUrl}
            className={cn(buttonVariants({ variant: 'link' }))}
          >
            楽天ブックスで見る
          </a>
        </div>
      </CardBody>
    </CardLayout>
  );
};

export default BookCard;
