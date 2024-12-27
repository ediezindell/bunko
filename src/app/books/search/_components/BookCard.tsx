import { Item } from "@/types/RakutenBooksSearchApiParams";
import Image from "next/image";

export const BookCard = async (props: { book: Item; }) => {
  const { book } = props;
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-lg bg-white">
      <div className="relative h-48 w-full">
        <Image
          src={book.largeImageUrl}
          alt={book.title}
          fill
          className="object-cover" />
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
        <p className="text-gray-600 mb-4 flex-grow">{book.author}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {['文庫あり', '映画化'].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-green-600">
            {new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(book.itemPrice)}
          </span>
          <a href={book.itemUrl} target="_blank" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            楽天ブックスで見る
          </a>
        </div>
      </div>
    </div>
  );
};

