import { useThemeContext } from "../../hooks/useThemeContext";
import BookItem from "./BookItem";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useAuthors } from "../../hooks/useAuthors";
import { useCategories } from "../../hooks/useCategories";

function BooksList({
  searchTerm,
  setModal,
  handleEditBook,
  setBookToEdit,
  deleteBook,
  books,
  handleSortBooks,
  sortOrder,
  isLoading,
  error,
  filtered,
}) {
  const { theme, handleTheme } = useThemeContext();

  const {
    state: { data: authors },
  } = useAuthors();
  const {
    state: { data: categories },
  } = useCategories();

  const mappingFunction = (array) => {
    return array.map((book) => {
      const bookAuthor = authors.find((author) => book.authorId === author.id);
      const bookCategory = categories.find(
        (category) => book.categoryId === category.id
      );
      return (
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase())) && (
          <BookItem
            key={book.id}
            book={book}
            handleEditBook={handleEditBook}
            deleteBook={deleteBook}
            bookAuthor={bookAuthor}
            bookCategory={bookCategory}
          />
        )
      );
    });
  };

  const renderedBooks =
    filtered.length === 0 ? mappingFunction(books) : mappingFunction(filtered);

  const handleAddBook = () => {
    setBookToEdit(undefined);
    setModal(true);
  };

  const handleThemeChange = () => {
    handleTheme();
  };

  let content;

  if (isLoading) {
    content = (
      <tbody>
        <tr>
          <td>Loading Data...</td>
        </tr>
      </tbody>
    );
  } else if (error) {
    content = (
      <tbody>
        <tr>
          <td>Error Loading Data...</td>
        </tr>
      </tbody>
    );
  } else {
    content = <tbody>{renderedBooks}</tbody>;
  }

  return (
    <div
      className={`${theme === "dark" ? "bg-black" : "bg-slate-200"} my-3 p-2`}
    >
      <table className="table-fixed w-full">
        <thead className="border-b border-gray-900">
          <tr>
            <th>
              <button
                onClick={() =>
                  handleSortBooks(books, "title", filtered.length > 0 && true)
                }
                className="flex"
              >
                {sortOrder.title === 1 ? <GoChevronDown /> : <GoChevronUp />}
                Title
              </button>
            </th>
            <th>
              <button
                onClick={() =>
                  handleSortBooks(books, "author", filtered.length > 0 && true)
                }
                className="flex"
              >
                {sortOrder.author === 1 ? <GoChevronDown /> : <GoChevronUp />}
                Author
              </button>
            </th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        {content}
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
