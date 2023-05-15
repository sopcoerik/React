import { useThemeContext } from "../../hooks/useThemeContext";
import BookItem from "./BookItem";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function BooksList({
  searchTerm,
  setModal,
  handleEditBook,
  setBookToEdit,
  deleteBook,
  books,
  handleSortBooks,
  sortOrderTitle,
  sortOrderAuthor,
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
            <th>
              <button
                onClick={() => handleSortBooks(books, "title")}
                className="flex"
              >
                {sortOrderTitle === 1 ? <GoChevronDown /> : <GoChevronUp />}{" "}
                Title
              </button>
            </th>
            <th>
              <button
                onClick={() => handleSortBooks(books, "author")}
                className="flex"
              >
                {sortOrderAuthor === 1 ? <GoChevronDown /> : <GoChevronUp />}{" "}
                Author
              </button>
            </th>
            <th>Description</th>
            <th>Category</th>
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
