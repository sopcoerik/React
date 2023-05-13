import { useState } from "react";
import AddAuthorModal from "./AddAuthorModal";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";

function AuthorsList() {
  const { deleteAuthor, setModalIsOpen, authors, modalIsOpen, searchTerm } =
    useAuthorsContext();

  const [toEdit, setToEdit] = useState("");

  const handleDeleteAuthorClick = (author) => {
    deleteAuthor(author);
  };

  const handleAddAuthorClick = () => {
    setToEdit("");
    setModalIsOpen(true);
  };

  const handleEditAuthorClick = (author) => {
    setToEdit(author);
    setModalIsOpen(true);
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
      <AddAuthorModal
        isOpen={modalIsOpen}
        close={setModalIsOpen}
        inputToEdit={toEdit}
      />
    </div>
  );
}

export default AuthorsList;
