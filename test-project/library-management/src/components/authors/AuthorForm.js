import { useState } from "react";
import { useAuthors } from "../../hooks/useAuthors";

function AuthorForm({ toEdit, navigate }) {
  const [input, setInput] = useState(toEdit?.name || "");

  const { editAuthor, addAuthor } = useAuthors();

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toEdit ? editAuthor(toEdit, input) : addAuthor(input);
    navigate("/authors");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={handleInputChange} />
        <button>{toEdit ? "Save" : "Add Author"}</button>
      </form>
    </div>
  );
}

export default AuthorForm;
