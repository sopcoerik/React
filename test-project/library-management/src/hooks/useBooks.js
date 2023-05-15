import { useState, useEffect } from "react";
import axios from "axios";

export function useBooks() {
  const [books, setBooks] = useState([]);

  const booksURL = "https://645e200d12e0a87ac0e837cd.mockapi.io/books";

  const fetchBooks = async () => {
    const response = await axios.get(booksURL);

    setBooks(response.data);
  };

  const addBook = async (title, authorId, author, description) => {
    const response = await axios.post(booksURL, {
      title,
      authorId,
      author,
      description,
    });

    setBooks([...books, response.data]);
  };

  const editBook = async (book, title, author, description) => {
    const response = await axios.put(`${booksURL}/${book.id}`, {
      title,
      author,
      description,
    });

    const findBook = books.find((book) => book.id === response.data.id);
    const index = books.indexOf(findBook);
    const updatedBooks = books.map((book, i) =>
      i === index ? response.data : book
    );
    setBooks(updatedBooks);
  };

  const deleteBook = async (book) => {
    await axios.delete(`${booksURL}/${book.id}`);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return {
    books,
    setBooks,
    addBook,
    editBook,
    deleteBook,
  };
}
