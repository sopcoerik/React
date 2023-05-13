import { useState } from "react";
import { useBooksContext } from "../../hooks/useBooksContext";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";
import axios from "axios";
import Dropdown from "../utils/Dropdown";

import "./form.css";
function Form({ book, setIsEdited, handleCancelForm }) {
  const { setModalIsOpen, books, setBooks } = useBooksContext();
  const { authors } = useAuthorsContext();

  const [title, setTitle] = useState(book?.title || "");
  const [description, setDescription] = useState(book?.description || "");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const addBook = async () => {
    const response = await axios.post(
      "https://645e200d12e0a87ac0e837cd.mockapi.io/books",
      {
        title,
        authorId: selectedAuthor.id,
        author: selectedAuthor.name,
        description,
      }
    );

    setBooks([...books, response.data]);
  };

  const editBook = async (book) => {
    const response = await axios.put(
      `https://645e200d12e0a87ac0e837cd.mockapi.io/books/${book.id}`,
      {
        title,
        author: selectedAuthor.name,
        description,
      }
    );

    const findBook = books.find((book) => book.id === response.data.id);
    const index = books.indexOf(findBook);
    const updatedBooks = books.map((book, i) =>
      i === index ? response.data : book
    );
    setBooks(updatedBooks);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    book ? editBook(book) : addBook();
    setIsEdited ? setIsEdited(false) : setModalIsOpen(false);
  };

  return (
    <div className="absolute form bg-white w-1/2 h-1/2 rounded border">
      <form onSubmit={handleFormSubmit}>
        <input
          value={title}
          type="text"
          placeholder="Book Title"
          onChange={handleTitleChange}
        />
        <Dropdown
          options={authors}
          selectedAuthor={selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
        />
        <input
          value={description}
          type="text"
          placeholder="Book Description"
          onChange={handleDescriptionChange}
        />
        <button>Submit</button>
      </form>
      <button onClick={handleCancelForm}>Cancel</button>
    </div>
  );
}

export default Form;
