import CreateBook from "./components/CreateBook/CreateBook";
import ListBooks from "./components/ListBooks";

import axios from "axios";

import { useState, useEffect } from "react";

var localBaseUrl;
// localBaseUrl = 'http://localhost:3001/'
const baseUrl = localBaseUrl || "https://xwqd95-3001.csb.app/";

const booksApiUrl = baseUrl + "books";

function App() {
  const [books, setBooks] = useState([]);

  const handleFetchBooks = async () => {
    const response = await axios.get(booksApiUrl);

    setBooks(response.data);
  };

  useEffect(() => {
    handleFetchBooks();
  }, []);

  const handleCreateBook = async (title) => {
    const response = await axios.post(booksApiUrl, {
      title,
    });

    const updatedBooksArray = [...books, response.data];

    setBooks(updatedBooksArray);
  };

  const handleEditBook = async (newTitle, id) => {
    const response = await axios.put(`${booksApiUrl}/${id}`, {
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
    const response = await axios.delete(`${booksApiUrl}/${id}`);

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
