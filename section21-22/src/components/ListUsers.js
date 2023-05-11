import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchUsers, getUser, deleteUser } from "../store";
import { FaCircleNotch } from "react-icons/fa";

import { GoTrashcan } from "react-icons/go";

import UsersListItem from "./UsersListItem";
import Button from "./Button";
import Skeleton from "./Skeleton";

function ListUsers() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.users);

  const [dataIsLoading, setDataIsLoading] = useState(false);
  const [dataLoadError, setDataLoadError] = useState(null);

  const [userIsLoading, setUserIsLoading] = useState(false);
  const [userLoadError, setUserLoadError] = useState(null);

  const [userDeletionIsLoading, setUserDeletionIsLoading] = useState(false);
  const [userDeletionError, setUserDeletionError] = useState(null);

  useEffect(() => {
    setDataIsLoading(true);

    dispatch(fetchUsers())
      .unwrap()
      .catch((err) => setDataLoadError(err))
      .finally(() => setDataIsLoading(false));
  }, [dispatch]);

  const handleAddUserClick = () => {
    setUserIsLoading(true);
    dispatch(getUser())
      .unwrap()
      .catch((err) => setUserLoadError(err))
      .finally(() => setUserIsLoading(false));
  };

  const handleUserDelete = (user) => {
    setUserDeletionIsLoading(true);
    dispatch(deleteUser(user))
      .unwrap()
      .catch((err) => setUserDeletionError(err))
      .finally(() => setUserDeletionIsLoading(false));
  };

  let content;

  if (dataIsLoading) {
    content = <Skeleton numberOfBoxes={6} />;
  } else if (dataLoadError) {
    content = <div>Error Loading Data...</div>;
  } else {
    content = data.map((user) => (
      <UsersListItem key={user.id} user={user}>
        <Button
          className="mr-4"
          onClick={() => handleUserDelete(user)}
          disabled={userDeletionIsLoading}
        >
          {userDeletionIsLoading ? (
            <FaCircleNotch className="animate-spin" />
          ) : (
            <GoTrashcan />
          )}
        </Button>
        <p>{user.name}</p>
      </UsersListItem>
    ));
  }

  return (
    <div>
      <div className="flex items-center text-2xl justify-between my-5">
        <h3>Users</h3>
        <Button disabled={userIsLoading} onClick={handleAddUserClick}>
          {userIsLoading ? (
            <FaCircleNotch className="animate-spin" />
          ) : userLoadError ? (
            "Error Loading User..."
          ) : (
            "+ Add User"
          )}
        </Button>
      </div>
      <div>{content}</div>
    </div>
  );
}

export default ListUsers;
