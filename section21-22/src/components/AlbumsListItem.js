import { useState } from "react";

import { useDeleteAlbumMutation } from "../store";

import { GoTrashcan } from "react-icons/go";

import { GoChevronLeft, GoChevronDown } from "react-icons/go";
import { FaCircleNotch } from "react-icons/fa";

import Panel from "./Panel";
import Button from "./Button";
import ListPhotos from "./ListPhotos";

function AlbumsListItem({ children, album }) {
  const [deleteAlbum, deleteResponse] = useDeleteAlbumMutation();
  const { isLoading } = deleteResponse;

  const [isOpen, setIsOpen] = useState(false);

  const handlePanelOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAlbumDelete = () => {
    deleteAlbum(album);
  };

  const section = (
    <>
      <ListPhotos album={album} />
    </>
  );

  return (
    <div>
      <Panel>
        <div className="flex justify-between items-center">
          <div className="flex">
            <Button
              className="mr-4"
              onClick={handleAlbumDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <FaCircleNotch className="animate-spin" />
              ) : (
                <GoTrashcan />
              )}
            </Button>
            <div className="flex items-center text-xl">{children}</div>
          </div>

          <div onClick={handlePanelOpen} className="cursor-pointer">
            {isOpen ? <GoChevronDown /> : <GoChevronLeft />}
          </div>
        </div>
        {isOpen && section}
      </Panel>
    </div>
  );
}

export default AlbumsListItem;
