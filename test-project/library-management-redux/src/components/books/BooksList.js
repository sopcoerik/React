import BookItem from "./BookItem";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useAuthors } from "../../hooks/useAuthors";
import { useCategories } from "../../hooks/useCategories";
import Loader from "../utils/Loader";
import { useTheme } from "../../hooks/useTheme";
import Button from "../utils/Button";

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
  activeUser,
  handleBookDetailWindowState,
  allBooks,
  setPage,
  page,
}) {
  const theme = useTheme();

  const limit =
    allBooks?.length % 5 === 1 || allBooks?.length % 5 === 0
      ? (allBooks?.length % 5) + 1
      : allBooks?.length % 5;
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
            activeUser={activeUser}
            handleBookDetailWindowState={handleBookDetailWindowState}
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
      } my-3 px-5 py-7`}
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
                {sortOrder.title === 1 ? <GoChevronDown /> : <GoChevronUp />}
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
                {sortOrder.author === 1 ? <GoChevronDown /> : <GoChevronUp />}
                Author
              </button>
            </th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>{renderedBooks}</tbody>
      </table>
      <div className="flex justify-center items-center gap-2">
        <Button onClick={() => setPage(page > 1 ? page - 1 : 1)} rounded>
          Previous Page
        </Button>
        <div>
          {page}/{limit}
        </div>
        <Button
          onClick={() => setPage(page < limit ? page + 1 : limit)}
          rounded
        >
          Next Page
        </Button>
      </div>
      <div className="flex flex-col m-3">
        <div className="flex justify-end">
          {activeUser && (
            <Button
              primary
              rounded
              onClick={handleAddBook}
              disabled={addIsLoading}
            >
              {addIsLoading ? <Loader /> : "+ Add Book"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BooksList;
