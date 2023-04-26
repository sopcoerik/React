import CreateBook from "./components/CreateBook";
import ListBooks from "./components/ListBooks";

import { useState } from "react";

function App() {
  const [books, setBooks] = useState([]);

  const handleCreateBook = (title) => {
    const updatedBooksArray = [
      ...books,
      { id: Math.floor(Math.random() * 99999), title },
    ];

    setBooks(updatedBooksArray);
  };

  const handleEditBook = (newTitle, id) => {
    const updatedBooksArray = books.map((book) => {
      if (book.id === id) {
        return { ...book, title: newTitle };
      }

      return book;
    });

    setBooks(updatedBooksArray);
  };

  const handleDeleteBook = (id) => {
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
