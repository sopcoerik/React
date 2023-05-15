import { useAuthors } from "../../hooks/useAuthors";

function BookItem({ book, handleEditBook, deleteBook }) {
  const { authors } = useAuthors();

  const handleDeleteBook = (book) => {
    deleteBook(book);
  };

  const bookAuthor = authors.find((author) => book.authorId === author.id);

  return (
    <>
      <tr className="border-b border-slate-300">
        <td>{book.title}</td>
        <td>{bookAuthor?.name}</td>
        <td>{book.description}</td>
        <td>
          <button
            className="border rounded hover:bg-blue-300 hover:text-white px-2 py-1 border-slate-500 m-2"
            onClick={() => handleEditBook(book)}
          >
            Edit Book
          </button>
          <button
            className="border rounded hover:bg-red-300 hover:text-white px-2 py-1 border-slate-500 m-2"
            onClick={() => handleDeleteBook(book)}
          >
            Delete
          </button>
        </td>
      </tr>
    </>
  );
}

export default BookItem;
