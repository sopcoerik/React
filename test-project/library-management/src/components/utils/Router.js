import { useState, useTransition } from "react";
import { useThemeContext } from "../../hooks/useThemeContext";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";

import MainPage from "../../pages/MainPage/MainPage";
import AuthorsPage from "../../pages/AuthorsPage/AuthorsPage";
import Header from "../../pages/Header/Header";
import Modal from "./Modal";

const Router = () => {
  const { handleDarkTheme, isDark } = useThemeContext();
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
      <div className="flex justify-end">
        <button
          className={`border rounded px-3 py-1 m-2 ${
            isDark
              ? "hover:bg-white hover:text-black"
              : "hover:bg-black hover:text-white"
          }`}
          onClick={handleDarkTheme}
        >
          Dark Theme
        </button>
      </div>
      {content}
    </div>
  );
};

export default Router;
