import { useFetchAlbumsQuery } from "../store";

import AlbumsListItem from "./AlbumsListItem";

import Skeleton from "./Skeleton";

function AlbumsList({ user }) {
  const { data, isFetching, error } = useFetchAlbumsQuery(user);

  let content;

  if (isFetching) {
    content = <Skeleton numberOfBoxes={3} />;
  } else if (error) {
    content = <div>Error loading content...</div>;
  } else {
    content = data.map((album) => (
      <AlbumsListItem key={album.id} album={album}>
        {album.title}
      </AlbumsListItem>
    ));
  }

  return (
    <div>
      <div>{content}</div>
    </div>
  );
}

export default AlbumsList;
