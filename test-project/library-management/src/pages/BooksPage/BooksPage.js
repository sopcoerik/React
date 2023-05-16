import { useState, useEffect, useReducer, useCallback } from "react";
import axios from "axios";

import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";
import Modal from "../../components/utils/Modal";
import Form from "../../components/utils/Form";
import FilterBooks from "../../components/books/FilterBooks";

function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({});
  const [filtered, setFiltered] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    title: 1,
    author: 1,
  });

  const booksURL = "https://645e200d12e0a87ac0e837cd.mockapi.io/books";

  const IS_LOADING = "is_loading";
  const SET_DATA = "set_data";
  const SET_ERROR = "set_error";

  const booksReducer = (state, action) => {
    switch (action.type) {
      case IS_LOADING:
        return {
          isLoading: action.payload,
          data: state.data,
          error: state.error,
        };
      case SET_DATA:
        return {
          isLoading: false,
          data: action.payload,
          error: state.error,
        };
      case SET_ERROR:
        return {
          isLoading: false,
          data: state.data,
          error: action.payload,
        };
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(booksReducer, {
    isLoading: false,
    data: [],
    error: null,
  });

  const setData = (data) => {
    dispatch({
      type: SET_DATA,
      payload: data,
    });
  };

  const setIsLoading = (boolean) => {
    dispatch({
      type: IS_LOADING,
      payload: boolean,
    });
  };

  const setError = (err) => {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  };

  const fetchBooks = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(booksURL);

      setData(response.data);
    } catch (err) {
      setError(err);
    }
  }, []);

  const deleteBook = async (book) => {
    await axios.delete(`${booksURL}/${book.id}`);
    const updatedBooks = state.data.filter(
      (currentBook) => currentBook.id !== book.id
    );
    setData(updatedBooks);
  };

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleEditBook = (book) => {
    setBookToEdit(book);
    setModal(true);
  };

  const handleSortBooks = (books, sortBy) => {
    sortBy === "author"
      ? sortOrder[sortBy] === 1
        ? setSortOrder({ [sortBy]: -1, title: sortOrder.title })
        : setSortOrder({ [sortBy]: 1, title: sortOrder.title })
      : sortOrder[sortBy] === 1
      ? setSortOrder({ [sortBy]: -1, author: sortOrder.author })
      : setSortOrder({ [sortBy]: 1, author: sortOrder.author });

    sortBooks(books, sortBy);
  };

  const sortBooks = (books, sortBy) => {
    const copiedBooks = [...books];
    const availableSortingProperties = ["title", "author"];

    sortBy = availableSortingProperties.includes(sortBy)
      ? sortBy
      : availableSortingProperties[0];

    copiedBooks.sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]) * sortOrder[sortBy];
    });

    setData(copiedBooks);
  };

  const getFilteredBooks = (filteredBooks) => {
    setFiltered(filteredBooks);
  };
  console.log(filtered);
  return (
    <div className="container mx-auto">
      <div>
        <SearchBooks term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div>
        <FilterBooks
          books={state.data}
          setBooks={setData}
          getFilteredBooks={getFilteredBooks}
          filtered={filtered}
        />
      </div>
      <div>
        <BooksList
          searchTerm={searchTerm}
          setModal={setModal}
          handleEditBook={handleEditBook}
          setBookToEdit={setBookToEdit}
          deleteBook={deleteBook}
          books={state.data}
          handleSortBooks={handleSortBooks}
          sortOrder={sortOrder}
          isLoading={state.isLoading}
          error={state.error}
          filtered={filtered}
        />
      </div>
      {modal && (
        <Modal setModal={setModal}>
          <Form
            setModal={setModal}
            book={bookToEdit}
            books={state.data}
            setBooks={setData}
          />
        </Modal>
      )}
    </div>
  );
}

export default BooksPage;
