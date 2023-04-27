import { createContext, useState } from "react";
import axios from "axios";

const BooksContext = createContext();

const Provider = ({ children }) => {
  const [books, setBooks] = useState([]);

  const handleFetchBooks = async () => {
    const response = await axios.get(`http://localhost:3001/books`);

    setBooks(response.data);
  };

  const handleCreateBook = async (title) => {
    const response = await axios.post(`http://localhost:3001/books`, {
      title,
    });

    const updatedBooksArray = [...books, response.data];

    setBooks(updatedBooksArray);
  };

  const handleEditBook = async (newTitle, id) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle,
    });

    const updatedBooksArray = books.map((book) => {
      if (book.id === id) {
        return { ...book, ...response.data };
      }

      return book;
    });

    setBooks(updatedBooksArray);
  };

  const handleDeleteBook = async (id) => {
    const response = await axios.delete(`http://localhost:3001/books/${id}`);

    const updatedBooksArray = books.filter((book) => book.id !== id);

    setBooks(updatedBooksArray);
  };

  const objectToShare = {
    books,
    handleFetchBooks,
    handleCreateBook,
    handleDeleteBook,
    handleEditBook,
  };

  return (
    <BooksContext.Provider value={objectToShare}>
      {children}
    </BooksContext.Provider>
  );
};

export { Provider };
export default BooksContext;
