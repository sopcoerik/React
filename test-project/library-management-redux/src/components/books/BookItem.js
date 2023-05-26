import Button from "../common/Button";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useState } from "react";
import { Link } from "react-router-dom";

function BookItem({
  book,
  handleEditBook,
  bookAuthor,
  bookCategory,
  activeUser,
  deleteMessage,
  handleFavoriteClick,
  favorites,
}) {
  const [favorite, setFavorite] = useState(false);

  const favoriteBook =
    activeUser &&
    favorites &&
    favorites.find((favorite) => favorite.bookId === book.id);

  return (
    <>
      <tr className="border-b border-slate-300 h-24">
        <td className="h-24 flex gap-3 items-center">
          {activeUser && (
            <button
              onClick={() =>
                handleFavoriteClick(
                  book.id,
                  favoriteBook,
                  favorite,
                  setFavorite
                )
              }
            >
              {favorite || favoriteBook ? (
                <MdFavorite className="text-lg" />
              ) : (
                <MdFavoriteBorder className="text-lg" />
              )}
            </button>
          )}
          <Link
            to={activeUser ? `/detail/${book.id}` : ""}
            target={activeUser ? "_blank" : ""}
          >
            <p className="cursor-pointer">{book.title}</p>
          </Link>
        </td>
        <td>{bookAuthor?.name}</td>
        <td>{book.description}</td>
        <td>{bookCategory?.name}</td>
        <td>
          {activeUser && (
            <>
              <Button rounded onClick={() => handleEditBook(book.id)}>
                Edit Book
              </Button>

              <Button rounded danger onClick={() => deleteMessage(book)}>
                Delete
              </Button>
            </>
          )}
        </td>
      </tr>
    </>
  );
}

export default BookItem;
