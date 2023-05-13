import { useState } from "react";
import { useBooksContext } from "../../hooks/useBooksContext";

import AddBookModal from "./AddBookModal";

function BookItem({ book }) {
  const { setBooks, books, deleteBook } = useBooksContext();

  const [isEdited, setIsEdited] = useState(false);

  const handleDeleteBook = (book) => {
    deleteBook(book);
    const updatedBooks = books.filter(
      (currentBook) => currentBook.id !== book.id
    );
    setBooks(updatedBooks);
  };

  const handleEditBook = () => {
    setIsEdited(true);
  };
  return (
    <>
      <tr>
        <td>{book.title}</td>
        <td>{book.author}</td>
        <td>{book.description}</td>
        <td>
          <button
            className="border rounded hover:bg-blue-400 hover:text-white px-2 py-1"
            onClick={handleEditBook}
          >
            Edit Book
          </button>
        </td>
        <td>
          <button
            className="border rounded hover:bg-red-400 hover:text-white px-2 py-1"
            onClick={() => handleDeleteBook(book)}
          >
            Delete
          </button>
        </td>
      </tr>

      <AddBookModal book={book} isOpen={isEdited} setIsEdited={setIsEdited} />
    </>
  );
}

export default BookItem;
