import ShowBook from "./ShowBook";

function ListBooks({ books, handleEditBook, handleDeleteBook }) {
  const renderedBooks = books.map((book) => (
    <ShowBook
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
