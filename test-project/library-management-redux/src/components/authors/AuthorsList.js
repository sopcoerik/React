import Loader from "../common/Loader";
import { useTheme } from "../../hooks/useTheme";

function AuthorsList({
  searchTerm,
  setModal,
  setAuthorToEdit,
  authors,
  deleteAuthor,
  addIsLoading,
  editIsLoading,
  deleteIsLoading,
  activeUser,
}) {
  const theme = useTheme();

  const handleDeleteAuthorClick = (id) => {
    deleteAuthor(id);
  };

  const handleAddAuthorClick = () => {
    setAuthorToEdit(null);
    setModal(true);
  };

  const handleEditAuthorClick = (author) => {
    setAuthorToEdit(author);
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
          <div className="h-10">
            {activeUser && (
              <>
                <button
                  onClick={() => handleEditAuthorClick(author)}
                  className="px-3 py-1 border border-slate-300 rounded hover:bg-blue-300 mb-2 hover:text-white"
                >
                  {editIsLoading ? <Loader /> : "Edit Author"}
                </button>
                <button
                  onClick={() => handleDeleteAuthorClick(author.id)}
                  className="px-3 py-1 ml-3 border border-slate-300 rounded hover:bg-red-300 mb-2 hover:text-white"
                >
                  {deleteIsLoading ? <Loader /> : "Delete"}
                </button>
              </>
            )}
          </div>
        </div>
      )
  );

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-slate-200"
      } p-2`}
    >
      <div className="p-2 font-bold text-lg">Name</div>
      {renderedAuthors}
      <div className="flex justify-end m-2">
        {activeUser && (
          <button
            className="px-3 py-1 border rounded hover:bg-blue-300 hover:text-white"
            onClick={handleAddAuthorClick}
          >
            {addIsLoading ? <Loader /> : "+ Add Author"}
          </button>
        )}
      </div>
    </div>
  );
}

export default AuthorsList;
