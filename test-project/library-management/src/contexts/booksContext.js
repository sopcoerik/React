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
  };

  return (
    <BooksContext.Provider value={valuesForContext}>
      {children}
    </BooksContext.Provider>
  );
}
