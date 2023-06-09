import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useTheme } from "../../hooks/useTheme";
import Button from "../common/Button";

function BooksList({
  books,
  setModal,
  setBookToEditId,
  sorting,
  setSorting,
  activeUser,
  setPage,
  page,
  renderedBooks,
}) {
  const theme = useTheme();

  const handleAddBook = () => {
    setBookToEditId(undefined);
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
            <Button primary rounded onClick={handleAddBook}>
              + Add Book
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default BooksList;
