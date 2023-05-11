import { GoTrashcan } from "react-icons/go";
import { FaCircleNotch } from "react-icons/fa";
import {
  useFetchPhotosQuery,
  useCreatePhotoMutation,
  useDeletePhotoMutation,
} from "../store";

import Button from "./Button";
import { useDispatch } from "react-redux";

function ListPhotos({ album }) {
  const { data, isLoading, error } = useFetchPhotosQuery(album);
  const [createPhoto, createPhotoResponse] = useCreatePhotoMutation();
  const { isLoading: isPhotoLoading } = createPhotoResponse;
  const [deletePhoto, deletePhotoResponse] = useDeletePhotoMutation();
  const { isLoading: isDeleting } = deletePhotoResponse;

  const handleDeletePhoto = (photo) => {
    deletePhoto(photo);
  };

  let content;

  if (isLoading) {
    content = <FaCircleNotch className="animate-spin" />;
  } else if (error) {
    content = <div>Error :|</div>;
  } else {
    content = data.map((img) => {
      return (
        <div key={img.id} className="relative w-36 cursor-pointer m-3">
          <img src={img.url} alt="random img" />
          <div
            className="absolute inset-0 bg-gray-200 opacity-0 hover:opacity-80 flex justify-center items-center text-5xl"
            onClick={() => handleDeletePhoto(img)}
          >
            {isDeleting ? (
              <FaCircleNotch className="animate-spin" />
            ) : (
              <GoTrashcan />
            )}
          </div>
        </div>
      );
    });
  }

  const handleAddPhoto = () => {
    createPhoto(album);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold my-2">
          Photos in {album.title} album
        </h3>
        <Button onClick={handleAddPhoto} disabled={isPhotoLoading}>
          {isPhotoLoading ? (
            <FaCircleNotch className="animate-spin" />
          ) : (
            "+ Add Photo"
          )}
        </Button>
      </div>
      <div className="flex justify-center items-center flex-wrap">
        {content}
      </div>
    </div>
  );
}

export default ListPhotos;
