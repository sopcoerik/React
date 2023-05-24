function FavoritesItem({ favorite, author }) {
  return (
    <div className="border-y border-gray-300 p-1 my-1">
      <h4 className="italic font-thin">{favorite.title}</h4>
      <p className="text-sm">{author ? author.name : "Anonymous"}</p>
    </div>
  );
}

export default FavoritesItem;
