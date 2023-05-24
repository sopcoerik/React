import BookItem from "./BookItem";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import Loader from "../common/Loader";
import { useTheme } from "../../hooks/useTheme";
import Button from "../common/Button";

function BooksList({
  books,
  setModal,
  handleEditBook,
  setBookToEdit,
  sorting,
  setSorting,
  deleteBook,
  addIsLoading,
  editIsLoading,
  deleteIsLoading,
  activeUser,
  handleBookDetailWindowState,
  setPage,
  page,
  authors,
  categories,
}) {
  const theme = useTheme();

  const mappingFunction = (array) => {
    return array.map((book) => {
      const bookAuthor = authors?.find((author) => book.authorId === author.id);
      const bookCategory = categories?.find(
        (category) => book.categoryId === category.id
      );
      return (
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
                  setSorting({
                    sortBy: "title",
                    sortOrder: sorting.sortOrder === "desc" ? "asc" : "desc",
                  })
                }
                className="flex"
              >
                {sorting.sortBy === "title" &&
                  (sorting.sortOrder === "desc" ? (
                    <GoChevronDown />
                  ) : (
                    <GoChevronUp />
                  ))}
                Title
              </button>
            </th>
            <th>
              <button
                onClick={() =>
                  setSorting({
                    sortBy: "author",
                    sortOrder: sorting.sortOrder === "desc" ? "asc" : "desc",
                  })
                }
                className="flex"
              >
                {sorting.sortBy === "author" &&
                  (sorting.sortOrder === 1 ? (
                    <GoChevronDown />
                  ) : (
                    <GoChevronUp />
                  ))}
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
        <Button
          onClick={() => setPage(books.length > 4 ? page + 1 : page)}
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
