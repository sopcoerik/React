import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";
import Modal from "../../components/common/Modal";
import Overlay from "../../components/common/Overlay";
import Dropdown from "../../components/common/Dropdown";
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
import BookItem from "../../components/books/BookItem";
import { useTheme } from "../../hooks/useTheme";

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
  const { data: categories } = useFetchCategoriesQuery();

  const { data: books, isLoading: booksAreLoading } = useFetchBooksQuery({
    term: searchTerm,
    catId: selectedCategoriesIds[0],
    sortBy: sorting.sortBy,
    order: sorting.sortOrder,
    page,
  });

  // Other
  const [deleteBook] = useDeleteBookMutation();

  const [addBook] = useAddBooksMutation();

  const [editBook] = useEditBookMutation();

  const [addReview] = useAddReviewMutation();

  const [bookToEdit, setBookToEdit] = useState({});

  const theme = useTheme();

  const [reviewWindow, setReviewWindow] = useState(false);
  const [bookDetailWindow, setBookDetailWindow] = useState(false);
  const [reviewedBookId, setReviewedBookId] = useState(null);
  const [bookToView, setBookToView] = useState(null);
  const { data: users } = useFetchUsersQuery();
  const { data: authors } = useFetchAuthorsQuery();
  const { data: reviews } = useFetchReviewsQuery();

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    setModalIsOpen(true);
    setBookToEdit(book);
  };

  const mappingFunction = (array) => {
    return array?.map((book) => {
      const bookAuthor = authors?.find((author) => book.authorId === author.id);
      const bookCategory = categories?.find(
        (category) => book.categoryId === category.id
      );
      return (
        <BookItem
          key={book.id}
          book={book}
          handleEditBook={handleEditBook}
          bookAuthor={bookAuthor}
          bookCategory={bookCategory}
          deleteBook={deleteBook}
          activeUser={activeUser}
          handleBookDetailWindowState={handleBookDetailWindowState}
        />
      );
    });
  };

  const renderedBooks = mappingFunction(books);

  const [bookFormState, setBookFormState] = useState({
    title: bookToEdit.title || "",
    selectedAuthor: {},
    description: bookToEdit?.description || "",
    selectedCategory: {},
  });

  const handleFormInputsChange = (e) => {
    setBookFormState({ ...setBookFormState, [e.target.name]: e.target.value });
  };

  const handleAuthorChange = (value) => {
    setBookFormState({ ...bookFormState, selectedAuthor: value });
  };

  const handleCategoryChange = (value) => {
    setBookFormState({ ...bookFormState, selectedCategory: value });
  };
  console.log(bookFormState);
  console.log(bookToEdit);
  const handleBookFormSubmit = (e) => {
    e.preventDefault();

    bookToEdit
      ? editBook({
          id: bookToEdit.id,
          newBook: {
            title: bookFormState.title,
            authorId: bookFormState.selectedAuthor?.id,
            author: bookFormState.selectedAuthor?.name,
            description: bookFormState.description,
            categoryId: bookFormState.selectedCategory?.id,
            createdById: activeUser.id,
          },
        })
      : addBook({
          title: bookFormState.title,
          authorId: bookFormState.selectedAuthor.id,
          author: bookFormState.selectedAuthor.name,
          description: bookFormState.description,
          categoryId: bookFormState.selectedCategory.id,
          createdById: activeUser.id,
        });

    setBookFormState({
      title: "",
      selectedAuthor: {},
      description: "",
      selectedCategory: {},
    });

    setModalIsOpen(false);
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
            setModal={setModalIsOpen}
            setBookToEdit={setBookToEdit}
            sorting={sorting}
            setSorting={setSorting}
            activeUser={activeUser}
            page={page}
            setPage={setPage}
            renderedBooks={renderedBooks}
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

      <Modal
        isOpen={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        onOk={handleBookFormSubmit}
      >
        <>
          <form
            onSubmit={handleBookFormSubmit}
            className="p-10 flex flex-col gap-5 items-center"
          >
            <input
              value={bookFormState.title}
              name="title"
              type="text"
              placeholder="Book Title"
              onChange={handleFormInputsChange}
              className={`border rounded border-slate-200 w-full px-1 py-3 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            />
            <Dropdown
              author
              options={authors}
              book={bookToEdit}
              setSelectedAuthor={handleAuthorChange}
            />
            <input
              value={bookFormState.description}
              name="description"
              type="text"
              placeholder="Book Description"
              onChange={handleFormInputsChange}
              className={`border rounded border-slate-200 w-full px-1 py-3 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            />
            <Dropdown
              category
              options={categories}
              book={bookToEdit}
              setSelectedCategory={handleCategoryChange}
            />
          </form>
        </>
      </Modal>
      <Overlay setModal={setModalIsOpen} isOpen={modalIsOpen} />
    </div>
  );
}

export default BooksPage;
