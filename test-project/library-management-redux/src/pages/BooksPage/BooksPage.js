import { useState } from "react";
import { useSelector } from "react-redux";

import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";
import Modal from "../../components/common/Modal";
import Form from "../../components/common/Form";
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
  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const [page, setPage] = useState(1);

  // Search
  const [searchTerm, setSearchTerm] = useState("");
  // done

  //Sort
  const [sorting, setSorting] = useState({
    sortBy: "author",
    sortOrder: "desc",
  });
  // done

  // Filter
  const [selectedCategoriesIds, setSelectedCategoriesIds] = useState([]);
  const { data: categories, isLoading: categoriesAreLoading } =
    useFetchCategoriesQuery();

  const { data: books, isLoading: booksAreLoading } = useFetchBooksQuery({
    term: searchTerm,
    catId: selectedCategoriesIds[0],
    sortBy: sorting.sortBy,
    order: sorting.sortOrder,
    page,
  });

  // Other
  const [deleteBook, deleteResponse] = useDeleteBookMutation();
  const { isLoading: deleteIsLoading } = deleteResponse;

  const [addBook, addResponse] = useAddBooksMutation();
  const { isLoading: addIsLoading } = addResponse;

  const [editBook, editResponse] = useEditBookMutation();
  const { isLoading: editIsLoading } = editResponse;

  const [addReview] = useAddReviewMutation();

  const [modal, setModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({});

  const [reviewWindow, setReviewWindow] = useState(false);
  const [bookDetailWindow, setBookDetailWindow] = useState(false);
  const [reviewedBookId, setReviewedBookId] = useState(null);
  const [bookToView, setBookToView] = useState(null);
  const { data: users } = useFetchUsersQuery();
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

  return (
    <div className="container mx-auto">
      <div>
        <SearchBooks setTerm={setSearchTerm} />
      </div>
      <div>
        <FilterBooks
          categories={categories}
          setSelectedCategoriesIds={setSelectedCategoriesIds}
        />
      </div>
      <div>
        {!booksAreLoading && (
          <BooksList
            books={books}
            setModal={setModal}
            handleEditBook={handleEditBook}
            setBookToEdit={setBookToEdit}
            sorting={sorting}
            setSorting={setSorting}
            deleteBook={deleteBook}
            addIsLoading={addIsLoading}
            editIsLoading={editIsLoading}
            deleteIsLoading={deleteIsLoading}
            activeUser={activeUser}
            handleBookDetailWindowState={handleBookDetailWindowState}
            page={page}
            setPage={setPage}
            authors={authors}
            categories={categories}
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
          books={books}
          addBook={addBook}
          editBook={editBook}
          activeUser={activeUser}
          authors={authors}
          categories={categories}
        />
      )}
    </div>
  );
}

export default BooksPage;
