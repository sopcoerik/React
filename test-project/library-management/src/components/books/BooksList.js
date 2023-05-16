import { useThemeContext } from "../../hooks/useThemeContext";
import BookItem from "./BookItem";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useAuthors } from "../../hooks/useAuthors";
import { useCategories } from "../../hooks/useCategories";
import Loader from "../utils/Loader";

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

  let content;

  if (isLoading) {
    content = (
      <div className="w-full h-52 flex items-center justify-center">
        Loading Data...
        <Loader />
      </div>
    );
  } else if (error) {
    content = (
      <div className="w-full h-52 flex items-center justify-center text-red-900">
        Error Loading Data...
      </div>
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
        {!isLoading && !error && content}
      </table>
      <div className="flex flex-col m-3">
        <div>{(isLoading || error) && content}</div>
        <div className="flex justify-end">
          <button
            className="border rounded hover:bg-blue-300 px-3 py-1 border-slate-500 hover:text-white"
            onClick={handleAddBook}
          >
            + Add Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default BooksList;
