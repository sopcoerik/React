import BookItem from "./BookItem";
import Panel from "./Panel";
import { useBooks } from "../../hooks/useBooks";

function BooksList({ searchTerm }) {
  const { books } = useBooks();

  const renderedBooks = books.map(
    (book) =>
      (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())) && (
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
        <button className="border rounded hover:bg-blue-400 px-3 py-1">
          + Add Book
        </button>
      </div>
    </Panel>
  );
}

export default BooksList;
