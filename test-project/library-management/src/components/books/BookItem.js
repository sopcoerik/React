import { useReducer } from "react";

import AddBookModal from "./AddBookModal";
import { useBooks } from "../../hooks/useBooks";
import { useAuthors } from "../../hooks/useAuthors";

function BookItem({ book }) {
  const { setBooks, books, deleteBook } = useBooks();
  const { authors } = useAuthors();

  const simpleReducer = (state, action) => {
    switch (action.type) {
      case "is_edited":
        return {
          isEdited: action.payload,
        };

      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(simpleReducer, {
    isEdited: false,
  });

  const handleDeleteBook = (book) => {
    deleteBook(book);
    const updatedBooks = books.filter(
      (currentBook) => currentBook.id !== book.id
    );
    setBooks(updatedBooks);
  };

  const bookAuthor = authors.find((author) => book.authorId === author.id);

  const setIsEdited = (value) => {
    dispatch({
      type: "is_edited",
      payload: value,
    });
  };

  const handleEditBook = () => {
    dispatch({
      type: "is_edited",
      payload: true,
    });
  };

  return (
    <>
      <tr>
        <td>{book.title}</td>
        <td>{bookAuthor?.name}</td>
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

      <AddBookModal
        book={book}
        isOpen={state.isEdited}
        setIsEdited={setIsEdited}
      />
    </>
  );
}

export default BookItem;
