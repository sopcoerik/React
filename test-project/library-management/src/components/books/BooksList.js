import BookItem from "./BookItem";
import Panel from "./Panel";
import AddBookModal from "./AddBookModal";
import { useBooksContext } from "../../hooks/useBooksContext";

function BooksList() {
  const { modalIsOpen, setModalIsOpen, books, searchTerm } = useBooksContext();

  const handleAddBook = () => {
    setModalIsOpen(true);
  };

  const renderedBooks = books.map(
    (book) =>
      (book.title.includes(searchTerm) ||
        book.author.includes(searchTerm) ||
        book.description.includes(searchTerm)) && (
        <BookItem key={book.id} book={book} />
      )
  );

  return (
    <Panel>
      <table className="table-fixed">
        <thead>
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
          className="border rounded hover:bg-blue-400 px-3 py-1"
          onClick={handleAddBook}
        >
          + Add Book
        </button>
      </div>
      <AddBookModal isOpen={modalIsOpen} />
    </Panel>
  );
}

export default BooksList;
