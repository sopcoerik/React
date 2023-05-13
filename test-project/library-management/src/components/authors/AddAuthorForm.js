import { useState } from "react";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";

function AuthorForm({ inputToEdit, close }) {
  const { addAuthor, editAuthor } = useAuthorsContext();

  const [input, setInput] = useState(inputToEdit.name || "");

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    inputToEdit ? editAuthor(inputToEdit, input) : addAuthor(input);
    close(false);
  };

  return (
    <div className="absolute top-2/4 left-2/4 w-52 h-32 bg-white border rounded -translate-x-2/4 -translate-y-2/4">
      <form onSubmit={handleFormSubmit}>
        <input value={input} onChange={handleInputChange} className="border" />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default AuthorForm;
