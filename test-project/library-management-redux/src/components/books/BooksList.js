import BookItem from "./BookItem";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useAuthors } from "../../hooks/useAuthors";
import { useCategories } from "../../hooks/useCategories";
import Loader from "../utils/Loader";
import { useTheme } from "../../hooks/useTheme";
import { useSelector } from "react-redux";

function BooksList({
  searchTerm,
  books,
  setModal,
  handleEditBook,
  setBookToEdit,
  handleSortBooks,
  sortOrder,
  filteredArray,
  deleteBook,
  addIsLoading,
  editIsLoading,
  deleteIsLoading,
}) {
  const theme = useTheme();

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
            bookAuthor={bookAuthor}
            bookCategory={bookCategory}
            deleteBook={deleteBook}
            editIsLoading={editIsLoading}
            deleteIsLoading={deleteIsLoading}
          />
        )
      );
    });
  };

  const renderedBooks = mappingFunction(books);

  const handleAddBook = () => {
    setBookToEdit(undefined);
    setModal(true);
  };

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-slate-200"
      } my-3 p-2`}
    >
      <table className="table-fixed w-full">
        <thead className="border-b border-gray-900">
          <tr>
            <th>
              <button
                onClick={() =>
                  handleSortBooks(
                    books,
                    "title",
                    filteredArray.length > 0 && true
                  )
                }
                className="flex"
              >
                {sortOrder?.title === 1 ? <GoChevronDown /> : <GoChevronUp />}
                Title
              </button>
            </th>
            <th>
              <button
                onClick={() =>
                  handleSortBooks(
                    books,
                    "author",
                    filteredArray.length > 0 && true
                  )
                }
                className="flex"
              >
                {sortOrder?.author === 1 ? <GoChevronDown /> : <GoChevronUp />}
                Author
              </button>
            </th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{renderedBooks}</tbody>
      </table>
      <div className="flex flex-col m-3">
        <div className="flex justify-end">
          <button
            className="border rounded hover:bg-blue-300 px-3 py-1 border-slate-500 hover:text-white"
            onClick={handleAddBook}
            disabled={addIsLoading}
          >
            {addIsLoading ? <Loader /> : "+ Add Book"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BooksList;
