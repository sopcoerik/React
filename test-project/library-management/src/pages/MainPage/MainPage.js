import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";

function MainPage() {
  return (
    <div>
      <div>
        <SearchBooks />
      </div>
      <div>
        <BooksList />
      </div>
    </div>
  );
}

export default MainPage;
