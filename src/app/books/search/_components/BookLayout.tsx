import { Book } from '@/types/RakutenBooksSearchApi';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const CardLayout = ({ children }: PropsWithChildren) => (
  <div className="flex h-full w-80 flex-col gap-4 overflow-hidden rounded-lg border p-4 shadow-lg">
    {children}
  </div>
);

export const CardImage = ({
  largeImageUrl,
  title,
}: Pick<Book, 'largeImageUrl' | 'title'>) => (
  <div className="relative h-48 w-full">
    <Image src={largeImageUrl} alt={title} fill className="object-contain" />
  </div>
);

export const CardBody = ({ children }: PropsWithChildren) => (
  <div className="flex grow flex-col gap-2">{children}</div>
);

export const CardHeading = ({ title }: Pick<Book, 'title'>) => (
  <h2 className="grow text-xl font-semibold">
    <span>{title}</span>
  </h2>
);

export const CardParagraph = ({ children }: PropsWithChildren) => (
  <p className="text-muted-foreground">{children}</p>
);

export const CardPrice = ({ itemPrice }: Pick<Book, 'itemPrice'>) => (
  <span className="text-lg font-bold">
    {new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(itemPrice)}
  </span>
);

export const CardTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span key={tag} className="rounded-full bg-secondary px-4 py-2 text-sm">
        {tag}
      </span>
    ))}
  </div>
);
