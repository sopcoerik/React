import { useState } from "react";
import { useSelector } from "react-redux";

import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";
import FilterBooks from "../../components/books/FilterBooks";
import {
  useFetchBooksQuery,
  useDeleteBookMutation,
  useAddBooksMutation,
  useEditBookMutation,
  useAddReviewMutation,
  useFetchFavoritesQuery,
  useFetchCategoriesQuery,
  useFetchAuthorsQuery,
} from "../../store";

import BookItem from "../../components/books/BookItem";
import EditBookModal from "../../components/books/EditBookModal";

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
    term: searchTerm || "",
    catId: selectedCategoriesIds[0],
    sortBy: sorting.sortBy,
    order: sorting.sortOrder,
    page,
  });

  // Other
  const [deleteBook] = useDeleteBookMutation();

  // TODO: move these to EditBookModal
  const [addBook] = useAddBooksMutation();
  const [editBook] = useEditBookMutation();

  const [addReview] = useAddReviewMutation();

  const [bookToEditId, setBookToEditId] = useState(undefined);

  const [reviewWindow, setReviewWindow] = useState(false);
  const [bookDetailWindow, setBookDetailWindow] = useState(false);
  const [reviewedBookId, setReviewedBookId] = useState(null);
  const [bookToView, setBookToView] = useState(null);

  const { data: authors } = useFetchAuthorsQuery();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data: favorites } = useFetchFavoritesQuery(
    activeUser && { userId: activeUser?.id }
  );

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

  const handleEditBook = (id) => {
    setModalIsOpen(true);
    setBookToEditId(id);
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
          favorites={favorites}
        />
      );
    });
  };

  const renderedBooks = mappingFunction(books);

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
            setBookToEditId={setBookToEditId}
            sorting={sorting}
            setSorting={setSorting}
            activeUser={activeUser}
            page={page}
            setPage={setPage}
            renderedBooks={renderedBooks}
          />
        )}
      </div>

      <EditBookModal
        bookToEditId={bookToEditId}
        setBookToEditId={setBookToEditId}
        editBook={editBook}
        addBook={addBook}
        isOpen={modalIsOpen}
        onCancel={() => setModalIsOpen(false)}
        onOk={() => setModalIsOpen(false)}
        setIsOpen={setModalIsOpen}
        activeUser={activeUser}
        books={books}
        authors={authors}
        categories={categories}
      />
    </div>
  );
}

export default BooksPage;
