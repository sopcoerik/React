import { useState } from "react";

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
} from "../../store";

function BooksPage() {
  const { data, isLoading, error } = useFetchBooksQuery();
  const [deleteBook, deleteResponse] = useDeleteBookMutation();
  const { isLoading: deleteIsLoading } = deleteResponse;

  const [addBook, addResponse] = useAddBooksMutation();
  const { isLoading: addIsLoading } = addResponse;

  const [editBook, editResponse] = useEditBookMutation();
  const { isLoading: editIsLoading } = editResponse;

  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState({});
  const [filteredArray, setFilteredArray] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [sortOrder, setSortOrder] = useState({
    title: 1,
    author: 1,
  });
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
          />
        )}
      </div>
      {modal && (
        <Modal setModal={setModal}>
          <Form
            setModal={setModal}
            book={bookToEdit}
            books={data}
            addBook={addBook}
            editBook={editBook}
          />
        </Modal>
      )}
    </div>
  );
}

export default BooksPage;
