import Loader from "../utils/Loader";

function BookItem({
  book,
  handleEditBook,
  deleteBook,
  bookAuthor,
  bookCategory,
  editIsLoading,
  deleteIsLoading,
  activeUser,
  handleReview,
  handleBookDetailWindowState,
}) {
  const handleDeleteBook = (book) => {
    deleteBook(book.id);
  };

  return (
    <>
      <tr className="border-b border-slate-300 h-24">
        <td>
          <p
            onClick={() => activeUser && handleBookDetailWindowState(book)}
            className="cursor-pointer"
          >
            {book.title}
          </p>
        </td>
        <td>{bookAuthor?.name}</td>
        <td>{book.description}</td>
        <td>{bookCategory?.name}</td>
        <td>
          {activeUser && (
            <>
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
            </>
          )}
        </td>
        <td>
          {activeUser && (
            <button
              className="border rounded hover:bg-purple-400 hover:text-white px-2 py-1 border-slate-500 m-2"
              onClick={() => handleReview(book.id)}
            >
              Add Review
            </button>
          )}
        </td>
      </tr>
    </>
  );
}

export default BookItem;
