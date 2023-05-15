import { useState } from "react";

import AuthorsList from "../../components/authors/AuthorsList";
import SearchAuthors from "../../components/authors/SearchAuthors";

function AuthorsPage({ navigate }) {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <div>
        <SearchAuthors term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div>
        <AuthorsList navigate={navigate} searchTerm={searchTerm} />
      </div>
    </div>
  );
}

export default AuthorsPage;
