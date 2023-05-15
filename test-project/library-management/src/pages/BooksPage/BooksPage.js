import { useState } from "react";

import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";

function BooksPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div>
        <SearchBooks term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div>
        <BooksList searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default BooksPage;
