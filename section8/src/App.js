import CreateBook from "./components/CreateBook/CreateBook";
import ListBooks from "./components/ListBooks";

import { useEffect } from "react";

import useBooksContext from "./context/useBooksContext";

function App() {
  const { handleFetchBooks } = useBooksContext();

  useEffect(() => {
    handleFetchBooks();
  }, []);

  return (
    <div className="app">
      <CreateBook />
      <ListBooks />
    </div>
  );
}

export default App;
