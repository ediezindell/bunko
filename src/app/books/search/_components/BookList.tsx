import { Item } from "@/types/RakutenBooksSearchApiParams"
import BookCard from "./BookCard"

type Props = {
  books: Item[]
}
const BookList = ({ books }: Props) => {
  return (<ul className="flex flex-wrap gap-4">
    {books.map((book) => (
      <li key={book.isbn}>
        <BookCard book={book} />
      </li>
    ))}
  </ul>
  )
}

export default BookList
