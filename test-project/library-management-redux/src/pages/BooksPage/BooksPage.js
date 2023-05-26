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
  useFetchFavoritesQuery,
  useFetchCategoriesQuery,
  useFetchAuthorsQuery,
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from "../../store";

import BookItem from "../../components/books/BookItem";
import EditBookModal from "../../components/books/EditBookModal";
import Modal from "../../components/common/Modal";
import Loader from "../../components/common/Loader";

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

  // TODO: move these to EditBookModal
  const [addBook] = useAddBooksMutation();
  const [editBook] = useEditBookMutation();

  const [bookToEditId, setBookToEditId] = useState(undefined);

  const { data: authors } = useFetchAuthorsQuery();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { data: favorites } = useFetchFavoritesQuery(activeUser?.id, {
    skip: !activeUser,
  });

  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const [isDeleted, setIsDeleted] = useState(false);
  const [bookToDelete, setBookToDelete] = useState({});

  const handleEditBook = (id) => {
    setModalIsOpen(true);
    setBookToEditId(id);
  };

  const deleteMessage = (book) => {
    setBookToDelete(book);
    setIsDeleted(true);
  };

  const handleDeleteBook = (book) => {
    setIsDeleted(false);
    deleteBook(book.id);
  };

  const handleFavoriteClick = (bookId, favoriteBook, favorite, setFavorite) => {
    if (favorite || favoriteBook) {
      deleteFavorite({ userId: activeUser.id, favoriteId: favoriteBook.id });
      setFavorite(false);
      return;
    } else {
      addFavorite({
        userId: activeUser.id,
        bookId: bookId,
      });
      setFavorite(true);
    }
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
          activeUser={activeUser}
          deleteMessage={deleteMessage}
          isDeleted={isDeleted}
          setIsDeleted={setIsDeleted}
          handleFavoriteClick={handleFavoriteClick}
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
        {booksAreLoading && (
          <div className="w-full h-36 flex justify-center items-center">
            <Loader />
          </div>
        )}
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

      {isDeleted && (
        <Modal
          headerText={`Are you sure you want to delete ${bookToDelete.title} book?`}
          isOpen={isDeleted}
          onOk={() => handleDeleteBook(bookToDelete)}
          onCancel={() => setIsDeleted(false)}
          confirmText="Yes"
          cancelText="No"
        ></Modal>
      )}

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
