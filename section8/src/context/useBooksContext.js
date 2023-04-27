import { useContext } from "react";
import BooksContext from "./books";

const useBooksContext = () => {
  return useContext(BooksContext);
};

export default useBooksContext;
