import { useState } from "react";
import { useCreateAlbumMutation } from "../store/apis/albumsApi";

import { GoChevronLeft, GoChevronDown } from "react-icons/go";
import { FaCircleNotch } from "react-icons/fa";

import Panel from "./Panel";
import Button from "./Button";
import AlbumsList from "./AlbumsList";

function UsersListItem({ children, user }) {
  const [addAlbum, response] = useCreateAlbumMutation();
  const { isLoading } = response;
  const [isOpen, setIsOpen] = useState(false);

  const handlePanelOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAddAlbum = () => {
    addAlbum(user);
  };

  const panelHeader = (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center text-xl">{children}</div>
        <div onClick={handlePanelOpen} className="cursor-pointer">
          {isOpen ? <GoChevronDown /> : <GoChevronLeft />}
        </div>
      </div>
    </>
  );

  const panelContent = (
    <div className="flex justify-between items-center my-3">
      <h3 className="text-lg font-bold my-2">{user.name}'s album</h3>
      <Button onClick={handleAddAlbum} disabled={isLoading}>
        {isLoading ? <FaCircleNotch className="animate-spin" /> : "+ Add Album"}
      </Button>
    </div>
  );

  return (
    <div>
      <Panel>
        <>{panelHeader}</>
        {isOpen && panelContent}
        {isOpen && <AlbumsList user={user} />}
      </Panel>
    </div>
  );
}

export default UsersListItem;
