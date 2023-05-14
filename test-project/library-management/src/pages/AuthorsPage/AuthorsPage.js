import AuthorsList from "../../components/authors/AuthorsList";
import SearchAuthors from "../../components/authors/SearchAuthors";

function AuthorsPage({ navigate }) {
  return (
    <div>
      <div>
        <SearchAuthors />
      </div>
      <div>
        <AuthorsList navigate={navigate} />
      </div>
    </div>
  );
}

export default AuthorsPage;
