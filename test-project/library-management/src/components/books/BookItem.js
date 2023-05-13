import { useState } from "react";
import { useBooksContext } from "../../hooks/useBooksContext";

import AddBookModal from "./AddBookModal";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";

function BookItem({ book }) {
  const { setBooks, books, deleteBook } = useBooksContext();
  const { authors } = useAuthorsContext();

  const [isEdited, setIsEdited] = useState(false);

  const handleDeleteBook = (book) => {
    deleteBook(book);
    const updatedBooks = books.filter(
      (currentBook) => currentBook.id !== book.id
    );
    setBooks(updatedBooks);
  };

  const { name: bookAuthor } = authors.find(
    (author) => author.id === book.authorId
  );
  const handleEditBook = () => {
    setIsEdited(true);
  };
  return (
    <>
      <tr>
        <td>{book.title}</td>
        <td>{bookAuthor}</td>
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
