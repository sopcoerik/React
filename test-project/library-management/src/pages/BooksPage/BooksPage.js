import { useState, useEffect } from "react";
import axios from "axios";

import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";
import Modal from "../../components/utils/Modal";
import Form from "../../components/utils/Form";



function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({});
  const [books, setBooks] = useState([]);
  const [sortOrderTitle, setSortOrderTitle] = useState(1);
  const [sortOrderAuthor, setSortOrderAuthor] = useState(1);

  const booksURL = "https://645e200d12e0a87ac0e837cd.mockapi.io/books";

  const fetchBooks = async () => {
    const response = await axios.get(booksURL);

    setBooks(response.data);
  };

  const deleteBook = async (book) => {
    await axios.delete(`${booksURL}/${book.id}`);
    const updatedBooks = books.filter(
      (currentBook) => currentBook.id !== book.id
    );
    setBooks(updatedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setModal(true);
  };

  const handleSortBooks = (books, sortBy) => {
    sortBy === "title" &&
      (sortOrderTitle === 1 ? setSortOrderTitle(-1) : setSortOrderTitle(1));
    sortBy === "author" &&
      (sortOrderAuthor === 1 ? setSortOrderAuthor(-1) : setSortOrderAuthor(1));
    sortBooks(books, sortBy);
  };

  const sortBooks = (books, sortBy) => {
    const copiedBooks = [...books];

    copiedBooks.sort((a, b) => {
      if (sortBy === "title") {
        return a.title.localeCompare(b.title) * sortOrderTitle;
      } else if (sortBy === "author") {
        return a.author.localeCompare(b.author) * sortOrderAuthor;
      }
    });

    setBooks(copiedBooks);
  };

  return (
    <div className="container mx-auto">
      <div>
        <SearchBooks term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div>
        <BooksList
          searchTerm={searchTerm}
          setModal={setModal}
          handleEditBook={handleEditBook}
          setBookToEdit={setBookToEdit}
          deleteBook={deleteBook}
          books={books}
          handleSortBooks={handleSortBooks}
          sortOrderTitle={sortOrderTitle}
          sortOrderAuthor={sortOrderAuthor}
        />
      </div>
      {modal && (
        <Modal setModal={setModal}>
          <Form
            setModal={setModal}
            book={bookToEdit}
            books={books}
            setBooks={setBooks}
          />
        </Modal>
      )}
    </div>
  );
}

export default BooksPage;
