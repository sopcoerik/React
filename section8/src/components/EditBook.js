import { useState } from "react";

import useBooksContext from "../context/useBooksContext";

function EditBook({ book, handleEditButtonClick }) {
  const [newTitle, setNewTitle] = useState(`${book.title}`);

  const { handleEditBook } = useBooksContext();

  const handleSaveNewTitle = (e) => {
    e.preventDefault();
    setNewTitle(newTitle);
    handleEditBook(newTitle, book.id);
    handleEditButtonClick();
  };

  return (
    <div>
      <form onSubmit={handleSaveNewTitle} className="book-edit">
        <input
          className="input"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="button is-primary">Save New Title</button>
      </form>
    </div>
  );
}

export default EditBook;
