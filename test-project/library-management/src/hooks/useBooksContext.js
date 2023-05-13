import { BooksContext } from "../contexts/booksContext";
import { useContext } from "react";

export function useBooksContext() {
  return useContext(BooksContext);
}
