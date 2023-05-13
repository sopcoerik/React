import AuthorsList from "../../components/authors/AuthorsList";
import SearchAuthors from "../../components/authors/SearchAuthors";

function AuthorsPage() {
  return (
    <div>
      <div>
        <SearchAuthors />
      </div>
      <div>
        <AuthorsList />
      </div>
    </div>
  );
}

export default AuthorsPage;
