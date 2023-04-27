import { useState } from "react";
import "./CreateBook.css";
import useBooksContext from "../../context/useBooksContext";

function CreateBook() {
  const [title, setTitle] = useState("");

  const { handleCreateBook } = useBooksContext();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleCreateBook(title);
    setTitle("");
  };

  return (
    <div className="book-create">
      <h3>Add a Book to the List</h3>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label style={{ fontSize: "1.5rem", color: "white" }}>
            Book Title:
          </label>
          <input
            className="input"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <button className="button">Add to List</button>
        </form>
      </div>
    </div>
  );
}

export default CreateBook;
