import SearchBooks from "../../components/books/SearchBooks";
import BooksList from "../../components/books/BooksList";

function MainPage({ navigate }) {
  return (
    <div>
      <div>
        <SearchBooks />
      </div>
      <div>
        <button onClick={() => navigate("/modal")}>Modal</button>
      </div>
      <div>
        <BooksList />
      </div>
    </div>
  );
}

export default MainPage;
