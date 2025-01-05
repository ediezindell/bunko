import { Book } from '@/types/RakutenBooksSearchApi';
import Image from 'next/image';
import { PropsWithChildren } from 'react';

export const CardLayout = ({ children }: PropsWithChildren) => (
  <div className="flex h-full w-80 flex-col gap-4 overflow-hidden rounded-lg bg-white p-4 shadow-lg transition-all hover:scale-105">
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
  <p className="text-gray-600">{children}</p>
);

export const CardPrice = ({ itemPrice }: Pick<Book, 'itemPrice'>) => (
  <span className="text-lg font-bold text-green-600">
    {new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY',
    }).format(itemPrice)}
  </span>
);

export const CardTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-wrap gap-2">
    {tags.map((tag) => (
      <span
        key={tag}
        className="rounded-full bg-gray-200 px-2 py-1 text-sm text-gray-700"
      >
        {tag}
      </span>
    ))}
  </div>
);
