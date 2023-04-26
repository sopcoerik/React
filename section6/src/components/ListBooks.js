import BookCard from "./BookCard";

function ListBooks({ books, handleEditBook, handleDeleteBook }) {
  const renderedBooks = books.map((book) => (
    <BookCard
      book={book}
      key={book.id}
      handleEditBook={handleEditBook}
      handleDeleteBook={handleDeleteBook}
    />
  ));

  return (
    <div>
      <div className="book-list">{renderedBooks}</div>
    </div>
  );
}

export default ListBooks;
