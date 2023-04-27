import EditBook from "./EditBook";

import { useState } from "react";

import useBooksContext from "../context/useBooksContext";

function BookCard({ book }) {
  const [editState, setEditState] = useState(false);

  const { handleDeleteBook } = useBooksContext();

  const handleEditButtonClick = () => {
    setEditState(!editState);
  };

  const handleDeleteButtonClick = (e) => {
    e.preventDefault();

    handleDeleteBook(book.id);
  };

  let content = editState ? (
    <EditBook book={book} handleEditButtonClick={handleEditButtonClick} />
  ) : (
    <div>Title: {book.title}</div>
  );

  const imageLink = `https://picsum.photos/seed/${book.id}/300/200`;
  return (
    <div className="book-show">
      <img alt="image" src={imageLink} />
      <div className="content">{content}</div>
      <div className="actions">
        <button className="edit" onClick={handleEditButtonClick}></button>
        <button className="delete" onClick={handleDeleteButtonClick}></button>
      </div>
    </div>
  );
}

export default BookCard;
