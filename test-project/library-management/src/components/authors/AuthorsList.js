import { useAuthorsContext } from "../../hooks/useAuthorsContext";

function AuthorsList({ navigate }) {
  const { deleteAuthor, authors, searchTerm, setToEdit } = useAuthorsContext();

  const handleDeleteAuthorClick = (author) => {
    deleteAuthor(author);
  };

  const handleAddAuthorClick = () => {
    setToEdit("");
    navigate("/modal-authors-add");
  };

  const handleEditAuthorClick = (author) => {
    setToEdit(author);
    navigate("/modal-authors-edit");
  };

  const renderedAuthors = authors.map(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
        <div
          key={author.id}
          className="m-2 border-b flex justify-between items-center"
        >
          {author.name}
          <div>
            <button
              onClick={() => handleEditAuthorClick(author)}
              className="px-3 py-1 border rounded hover:bg-blue-400 mb-2"
            >
              Edit Author
            </button>
            <button
              onClick={() => handleDeleteAuthorClick(author)}
              className="px-3 py-1 border rounded hover:bg-red-400 mb-2"
            >
              Delete
            </button>
          </div>
        </div>
      )
  );

  return (
    <div>
      <div>{renderedAuthors}</div>
      <div className="flex justify-end m-2">
        <button
          className="px-3 py-1 border rounded hover:bg-blue-400"
          onClick={handleAddAuthorClick}
        >
          + Add Author
        </button>
      </div>
    </div>
  );
}

export default AuthorsList;
