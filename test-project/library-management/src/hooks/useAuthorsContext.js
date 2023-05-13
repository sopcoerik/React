import { useContext } from "react";
import { AuthorsContext } from "../contexts/authorsContext";

const useAuthorsContext = () => {
  return useContext(AuthorsContext);
};

export { useAuthorsContext };
