import { useEffect, useState } from "react";
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
  useGetAllBooksQuery,
} from "../../store";

import { useFetchReviewsQuery } from "../../store";
import { useFetchUsersQuery } from "../../store";
import { useFetchCategoriesQuery } from "../../store";
import { useFetchAuthorsQuery } from "../../store";

import BookReview from "../../components/books/BookReview";
import BookDetail from "../../components/books/BookDetail";

function BooksPage() {
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState({
    title: 1,
    author: 1,
  });

  const { data, isLoading } = useFetchBooksQuery(page);

  const [deleteBook, deleteResponse] = useDeleteBookMutation();
  const { isLoading: deleteIsLoading } = deleteResponse;

  const { data: allBooks } = useGetAllBooksQuery();

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

  const [reviewWindow, setReviewWindow] = useState(false);
  const [bookDetailWindow, setBookDetailWindow] = useState(false);
  const [reviewedBookId, setReviewedBookId] = useState(null);
  const [bookToView, setBookToView] = useState(null);
  const { data: users } = useFetchUsersQuery();
  const { data: categories } = useFetchCategoriesQuery();
  const { data: authors } = useFetchAuthorsQuery();

  const { data: reviews } = useFetchReviewsQuery();

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

  const handleEditBook = (book) => {
    setModal(true);
    setBookToEdit(book);
  };

  const handleSortBooks = (books, newSortBy, isFiltered) => {
    newSortBy === "author"
      ? sortOrder[newSortBy] === 1
        ? setSortOrder({ [newSortBy]: -1, title: sortOrder.title })
        : setSortOrder({ [newSortBy]: 1, title: sortOrder.title })
      : sortOrder[newSortBy] === 1
      ? setSortOrder({ [newSortBy]: -1, author: sortOrder.author })
      : setSortOrder({ [newSortBy]: 1, author: sortOrder.author });

    sortBooks(books, newSortBy, isFiltered);
  };

  const sortBooks = (books, newSortBy, isFiltered) => {
    const copiedBooks = [...books];
    const availableSortingProperties = ["title", "author"];

    newSortBy = availableSortingProperties.includes(newSortBy)
      ? newSortBy
      : availableSortingProperties[0];

    copiedBooks.sort((a, b) => {
      return a[newSortBy].localeCompare(b[newSortBy]) * sortOrder[newSortBy];
    });

    isFiltered ? setFilteredArray(copiedBooks) : setSortedBooks(copiedBooks);
  };

  useEffect(() => {
    setFilteredArray(data);
    setSortedBooks(data);
  }, [page, data]);

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
              (filteredArray?.length > 0 && filteredArray) ||
              (sortedBooks?.length > 0 && sortedBooks) ||
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
            handleBookDetailWindowState={handleBookDetailWindowState}
            page={page}
            setPage={setPage}
            allBooks={allBooks}
          />
        )}
      </div>
      {reviewWindow && <Modal setModal={setReviewWindow} />}
      {reviewWindow && (
        <BookReview
          setReviewWindow={setReviewWindow}
          activeUser={activeUser}
          addReview={addReview}
          reviewedBookId={bookToView.id}
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
          addReviewModal={handleReviewWindowState}
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
