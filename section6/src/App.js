import CreateBook from "./components/CreateBook";
import ListBooks from "./components/ListBooks";

import axios from "axios";

import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);

  const handleFetchBooks = async () => {
    const response = await axios.get(`http://localhost:3001/books`);

    setBooks(response.data);
  };

  useEffect(() => {
    handleFetchBooks();
  }, []);

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

  return (
    <div className="app">
      <CreateBook handleCreateBook={handleCreateBook} />
      <ListBooks
        books={books}
        handleEditBook={handleEditBook}
        handleDeleteBook={handleDeleteBook}
      />
    </div>
  );
}

export default App;
