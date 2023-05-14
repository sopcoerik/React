import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const BooksContext = createContext();

export default function Provider({ children }) {
  const booksURL = "https://645e200d12e0a87ac0e837cd.mockapi.io/books";

  const [books, setBooks] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBooks = async () => {
    const response = await axios.get(booksURL);

    setBooks(response.data);
  };

  const addBook = async (title, authorId, author, description) => {
    const response = await axios.post(
      "https://645e200d12e0a87ac0e837cd.mockapi.io/books",
      {
        title,
        authorId,
        author,
        description,
      }
    );

    setBooks([...books, response.data]);
  };

  const editBook = async (book, title, author, description) => {
    const response = await axios.put(
      `https://645e200d12e0a87ac0e837cd.mockapi.io/books/${book.id}`,
      {
        title,
        author,
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

  const deleteBook = async (book) => {
    await axios.delete(
      `https://645e200d12e0a87ac0e837cd.mockapi.io/books/${book.id}`
    );
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const valuesForContext = {
    books,
    setBooks,
    modalIsOpen,
    setModalIsOpen,
    fetchBooks,
    deleteBook,
    searchTerm,
    setSearchTerm,
    addBook,
    editBook,
  };

  return (
    <BooksContext.Provider value={valuesForContext}>
      {children}
    </BooksContext.Provider>
  );
}
