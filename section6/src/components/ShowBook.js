import EditBook from "./EditBook";

import { useState } from "react";

function ShowBook({ book, handleEditBook, handleDeleteBook }) {
  const [editState, setEditState] = useState(false);

  const handleEditButtonClick = () => {
    setEditState(!editState);
  };

  const handleDeleteButtonClick = (e) => {
    e.preventDefault();

    handleDeleteBook(book.id);
  };

  let content = editState ? (
    <EditBook
      book={book}
      handleEditBook={handleEditBook}
      handleEditButtonClick={handleEditButtonClick}
    />
  ) : (
    <div>Title: {book.title}</div>
  );

  const randomIDForLink = Math.floor(Math.random() * 99999);
  const imageLink = `https://picsum.photos/seed/${randomIDForLink}/300/200`;
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

export default ShowBook;
