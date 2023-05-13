import { useState, useTransition } from "react";

import MainPage from "../../pages/MainPage/MainPage";
import AuthorsPage from "../../pages/AuthorsPage/AuthorsPage";
import Header from "../../pages/Header/Header";

const Router = () => {
  const [page, setPage] = useState("/");
  const [isPending, startTransition] = useTransition();

  const navigate = (to) => {
    startTransition(() => {
      setPage(to);
    });
  };

  let content;

  if (page === "/") {
    content = <MainPage />;
  } else if (page === "/authors") {
    content = <AuthorsPage />;
  }

  return (
    <div>
      <Header navigate={navigate} />
      {content}
    </div>
  );
};

export default Router;
