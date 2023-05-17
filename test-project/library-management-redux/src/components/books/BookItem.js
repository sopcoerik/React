import Loader from "../utils/Loader";

function BookItem({
  book,
  handleEditBook,
  deleteBook,
  bookAuthor,
  bookCategory,
  editIsLoading,
  deleteIsLoading,
}) {
  const handleDeleteBook = (book) => {
    deleteBook(book.id);
  };

  return (
    <>
      <tr className="border-b border-slate-300">
        <td>{book.title}</td>
        <td>{bookAuthor?.name}</td>
        <td>{book.description}</td>
        <td>{bookCategory?.name}</td>
        <td>
          <button
            className="border rounded hover:bg-blue-300 hover:text-white px-2 py-1 border-slate-500 m-2"
            onClick={() => handleEditBook(book)}
            disabled={editIsLoading}
          >
            {editIsLoading ? <Loader /> : "Edit Book"}
          </button>
          <button
            className="border rounded hover:bg-red-300 hover:text-white px-2 py-1 border-slate-500 m-2"
            onClick={() => handleDeleteBook(book)}
            disabled={deleteIsLoading}
          >
            {deleteIsLoading ? <Loader /> : "Delete"}
          </button>
        </td>
      </tr>
    </>
  );
}

export default BookItem;
