import { useState, useTransition } from "react";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";

import MainPage from "../../pages/MainPage/MainPage";
import AuthorsPage from "../../pages/AuthorsPage/AuthorsPage";
import Header from "../../pages/Header/Header";
import Modal from "./Modal";

const Router = () => {
  const { toEdit } = useAuthorsContext();

  const [page, setPage] = useState("/");
  const [isPending, startTransition] = useTransition();

  const navigate = (to) => {
    startTransition(() => {
      setPage(to);
    });
  };

  let content;

  if (page === "/") {
    content = <MainPage navigate={navigate} />;
  } else if (page === "/authors") {
    content = <AuthorsPage navigate={navigate} />;
  } else if (page === "/modal-authors-add") {
    content = <Modal navigate={navigate} />;
  } else if (page === "/modal-authors-edit") {
    content = <Modal toEdit={toEdit} navigate={navigate} />;
  }

  return (
    <div>
      <Header navigate={navigate} />
      {content}
    </div>
  );
};

export default Router;
