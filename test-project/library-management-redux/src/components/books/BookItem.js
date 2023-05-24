import Loader from "../utils/Loader";
import Button from "../utils/Button";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useState } from "react";
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useFetchFavoritesQuery,
} from "../../store";

function BookItem({
  book,
  handleEditBook,
  deleteBook,
  bookAuthor,
  bookCategory,
  editIsLoading,
  deleteIsLoading,
  activeUser,
  handleBookDetailWindowState,
}) {
  const handleDeleteBook = (book) => {
    deleteBook(book.id);
  };

  const { data: favorites, isLoading: favoritesLoading } =
    useFetchFavoritesQuery(activeUser && { userId: activeUser?.id });

  const [favorite, setFavorite] = useState(false);
  const [addFavorite, addFavoriteResponse] = useAddFavoriteMutation();
  const [deleteFavorite, deleteFavoriteResponse] = useDeleteFavoriteMutation();

  const bookPresent =
    activeUser &&
    favorites &&
    favorites.find((favorite) => favorite.bookId === book.id);

  const handleFavoriteClick = (book) => {
    if (favorite || bookPresent) {
      deleteFavorite({ userId: activeUser.id, favoriteId: bookPresent.id });
      setFavorite(false);
      return;
    } else {
      addFavorite({
        userId: activeUser.id,
        bookId: book.id,
      });
      setFavorite(true);
    }
  };

  return (
    <>
      <tr className="border-b border-slate-300 h-24">
        <td className="h-24 flex gap-3 items-center">
          {activeUser && (
            <button onClick={() => handleFavoriteClick(book)}>
              {favorite || bookPresent ? (
                <MdFavorite className="text-lg" />
              ) : (
                <MdFavoriteBorder className="text-lg" />
              )}
            </button>
          )}
          <p
            onClick={() => {
              if (activeUser) {
                handleBookDetailWindowState(book);
              }
            }}
            className="cursor-pointer"
          >
            {book.title}
          </p>
        </td>
        <td>{bookAuthor?.name}</td>
        <td>{book.description}</td>
        <td>{bookCategory?.name}</td>
        <td>
          {activeUser && (
            <>
              <Button
                rounded
                onClick={() => handleEditBook(book)}
                disabled={editIsLoading}
              >
                {editIsLoading ? <Loader /> : "Edit Book"}
              </Button>

              <Button
                rounded
                danger
                onClick={() => handleDeleteBook(book)}
                disabled={deleteIsLoading}
              >
                {deleteIsLoading ? <Loader /> : "Delete"}
              </Button>
            </>
          )}
        </td>
      </tr>
    </>
  );
}

export default BookItem;
