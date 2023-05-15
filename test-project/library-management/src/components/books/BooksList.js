import { useThemeContext } from "../../hooks/useThemeContext";
import BookItem from "./BookItem";

function BooksList({
  searchTerm,
  setModal,
  handleEditBook,
  setBookToEdit,
  deleteBook,
  books,
}) {
  const { theme, handleTheme } = useThemeContext();
  const renderedBooks = books.map(
    (book) =>
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())) && (
        <BookItem
          key={book.id}
          book={book}
          handleEditBook={handleEditBook}
          deleteBook={deleteBook}
        />
      )
  );

  const handleAddBook = () => {
    setBookToEdit(undefined);
    setModal(true);
  };

  const handleThemeChange = () => {
    handleTheme();
  };

  return (
    <div
      className={`${theme === "dark" ? "bg-black" : "bg-slate-200"} my-3 p-2`}
    >
      <table className="table-fixed w-full">
        <thead className="border-b border-gray-900">
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>{renderedBooks}</tbody>
      </table>
      <div className="flex justify-end m-3">
        <button
          className={`border rounded ${
            theme === "dark"
              ? "hover:bg-white hover:text-black"
              : "hover:bg-black hover:text-white"
          } px-3 py-1 border-slate-500 mr-2`}
          onClick={handleThemeChange}
        >
          Dark Theme
        </button>
        <button
          className="border rounded hover:bg-blue-300 px-3 py-1 border-slate-500 hover:text-white"
          onClick={handleAddBook}
        >
          + Add Book
        </button>
      </div>
    </div>
  );
}

export default BooksList;
