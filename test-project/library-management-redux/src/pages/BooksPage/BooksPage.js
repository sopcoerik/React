import { useState } from "react";
import { useSelector } from "react-redux";

import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";
import Modal from "../../components/utils/Modal";
import Form from "../../components/utils/Form";
import FilterBooks from "../../components/books/FilterBooks";
import {
  useFetchBooksQuery,
  useDeleteBookMutation,
  useAddBooksMutation,
  useEditBookMutation,
  useAddReviewMutation,
} from "../../store";

import { useFetchReviewsQuery } from "../../store";
import { useFetchUsersQuery } from "../../store";
import { useFetchCategoriesQuery } from "../../store";
import { useFetchAuthorsQuery } from "../../store";

import BookReview from "../../components/books/BookReview";
import BookDetail from "../../components/books/BookDetail";

function BooksPage() {
  const { data, isLoading } = useFetchBooksQuery();
  const [deleteBook, deleteResponse] = useDeleteBookMutation();
  const { isLoading: deleteIsLoading } = deleteResponse;

  const [addBook, addResponse] = useAddBooksMutation();
  const { isLoading: addIsLoading } = addResponse;

  const [editBook, editResponse] = useEditBookMutation();
  const { isLoading: editIsLoading } = editResponse;

  const [addReview] = useAddReviewMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({});
  const [filteredArray, setFilteredArray] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    title: 1,
    author: 1,
  });

  const [reviewWindow, setReviewWindow] = useState(false);
  const [bookDetailWindow, setBookDetailWindow] = useState(false);
  const [reviewedBookId, setReviewedBookId] = useState(null);
  const [bookToView, setBookToView] = useState(null);
  const { data: users } = useFetchUsersQuery();
  const { data: categories } = useFetchCategoriesQuery();
  const { data: authors } = useFetchAuthorsQuery();

  const { data: reviews, isLoading: reviewsAreLoading } =
    useFetchReviewsQuery();

  const handleReviewWindowState = (id) => {
    if (reviewWindow === false) {
      setReviewedBookId(id);
    } else {
      setReviewedBookId(null);
    }
    setReviewWindow(!reviewWindow);
  };

  const handleBookDetailWindowState = (book) => {
    if (bookDetailWindow === false) {
      setBookToView(book);
    } else {
      setBookToView(null);
    }
    setBookDetailWindow(!bookDetailWindow);
  };

  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const handleEditBook = (book) => {
    setModal(true);
    setBookToEdit(book);
  };

  const handleSortBooks = (books, sortBy, isFiltered) => {
    sortBy === "author"
      ? sortOrder[sortBy] === 1
        ? setSortOrder({ [sortBy]: -1, title: sortOrder.title })
        : setSortOrder({ [sortBy]: 1, title: sortOrder.title })
      : sortOrder[sortBy] === 1
      ? setSortOrder({ [sortBy]: -1, author: sortOrder.author })
      : setSortOrder({ [sortBy]: 1, author: sortOrder.author });

    sortBooks(books, sortBy, isFiltered);
  };

  const sortBooks = (books, sortBy, isFiltered) => {
    const copiedBooks = [...books];
    const availableSortingProperties = ["title", "author"];

    sortBy = availableSortingProperties.includes(sortBy)
      ? sortBy
      : availableSortingProperties[0];

    copiedBooks.sort((a, b) => {
      return a[sortBy].localeCompare(b[sortBy]) * sortOrder[sortBy];
    });

    isFiltered ? setFilteredArray(copiedBooks) : setSortedBooks(copiedBooks);
  };

  const getFilteredBooks = (filteredBooks) => {
    setFilteredArray(filteredBooks);
  };

  return (
    <div className="container mx-auto">
      <div>
        <SearchBooks term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div>
        <FilterBooks
          books={data}
          getFilteredBooks={getFilteredBooks}
          filteredArray={filteredArray}
        />
      </div>
      <div>
        {!isLoading && (
          <BooksList
            searchTerm={searchTerm}
            books={
              (filteredArray.length > 0 && filteredArray) ||
              (sortedBooks.length > 0 && sortedBooks) ||
              data
            }
            setModal={setModal}
            handleEditBook={handleEditBook}
            setBookToEdit={setBookToEdit}
            handleSortBooks={handleSortBooks}
            sortOrder={sortOrder}
            deleteBook={deleteBook}
            filteredArray={filteredArray}
            addIsLoading={addIsLoading}
            editIsLoading={editIsLoading}
            deleteIsLoading={deleteIsLoading}
            activeUser={activeUser}
            handleReview={handleReviewWindowState}
            handleBookDetailWindowState={handleBookDetailWindowState}
          />
        )}
      </div>
      {reviewWindow && <Modal setModal={setReviewWindow} />}
      {reviewWindow && (
        <BookReview
          setReviewWindow={setReviewWindow}
          activeUser={activeUser}
          addReview={addReview}
          reviewedBookId={reviewedBookId}
        />
      )}

      {bookDetailWindow && <Modal setModal={handleBookDetailWindowState} />}
      {bookDetailWindow && (
        <BookDetail
          handleBookDetailWindowState={handleBookDetailWindowState}
          bookToView={bookToView}
          reviews={reviews}
          users={users}
          activeUser={activeUser}
          categories={categories}
          authors={authors}
        />
      )}

      {modal && <Modal setModal={setModal} />}
      {modal && (
        <Form
          setModal={setModal}
          book={bookToEdit}
          books={data}
          addBook={addBook}
          editBook={editBook}
          activeUser={activeUser}
        />
      )}
    </div>
  );
}

export default BooksPage;
