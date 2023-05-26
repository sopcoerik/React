import { GrFavorite } from "react-icons/gr";
import { useState } from "react";
import FavoritesItem from "./FavoritesItem";

import {
  useFetchFavoritesQuery,
  useFetchAuthorsQuery,
  useFetchBooksQuery,
} from "../../store";

function Favorites({ activeUser }) {
  const [favOpen, setFavOpen] = useState(false);

  const handleFavoritesState = () => {
    setFavOpen(!favOpen);
  };

  // todo: move this to favorites component
  const { data: favorites } = useFetchFavoritesQuery(activeUser?.id, {
    skip: !activeUser,
  });

  const { data: authors } = useFetchAuthorsQuery();
  const { data: books } = useFetchBooksQuery();

  const renderedFavorites = favorites?.map((fav) => {
    const favBook = books.find((book) => book.id === fav.bookId);
    const favAuthor = authors?.find(
      (author) => author.id === favBook?.authorId
    );
    return <FavoritesItem favorite={favBook} author={favAuthor} key={fav.id} />;
  });
  return (
    <div className="relative">
      <div onClick={handleFavoritesState} className="hover:cursor-pointer">
        <GrFavorite className="text-3xl" />
      </div>
      {favOpen && (
        <div className="absolute w-44 top-3/4 right-2/4 border rounded-lg border-gray-500 bg-white">
          <div>
            {favOpen && renderedFavorites.length > 0 ? (
              renderedFavorites
            ) : (
              <p className="p-1">Add a book to your favorites! :)</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
