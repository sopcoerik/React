import BookCard from "./BookCard";

import useBooksContext from "../context/useBooksContext";

function ListBooks() {
  const { books } = useBooksContext();

  const renderedBooks = books.map((book) => (
    <BookCard book={book} key={book.id} />
  ));

  return (
    <div>
      <div className="book-list">{renderedBooks}</div>
    </div>
  );
}

export default ListBooks;
