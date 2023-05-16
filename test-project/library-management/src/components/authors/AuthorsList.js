import { useAuthors } from "../../hooks/useAuthors";
import { useThemeContext } from "../../hooks/useThemeContext";

function AuthorsList({ searchTerm, deleteAuthor, setModal, setAuthorName }) {
  const { theme } = useThemeContext();
  const {
    state: { data: authors, isLoading, error },
  } = useAuthors();

  const handleDeleteAuthorClick = (author) => {
    deleteAuthor(author);
  };

  const handleAddAuthorClick = () => {
    setAuthorName("");
    setModal(true);
  };

  const handleEditAuthorClick = (author) => {
    setAuthorName(author);
    setModal(true);
  };

  const renderedAuthors = authors.map(
    (author) =>
      author.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
        <div
          key={author.id}
          className="m-2 border-b border-slate-300 flex justify-between items-center"
        >
          {author.name}
          <div>
            <button
              onClick={() => handleEditAuthorClick(author)}
              className="px-3 py-1 border border-slate-300 rounded hover:bg-blue-300 mb-2 hover:text-white"
            >
              Edit Author
            </button>
            <button
              onClick={() => handleDeleteAuthorClick(author)}
              className="px-3 py-1 ml-3 border border-slate-300 rounded hover:bg-red-300 mb-2 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )
  );

  let content;

  if (isLoading) {
    content = <div>Loading Data...</div>;
  } else if (error) {
    content = <div>Error Loading Data...</div>;
  } else {
    content = <div>{renderedAuthors}</div>;
  }

  return (
    <div className={`${theme ? "bg-dark" : "bg-slate-200"} -mt-4 p-2`}>
      {content}
      <div className="flex justify-end m-2">
        <button
          className="px-3 py-1 border rounded hover:bg-blue-300 hover:text-white"
          onClick={handleAddAuthorClick}
        >
          + Add Author
        </button>
      </div>
    </div>
  );
}

export default AuthorsList;
