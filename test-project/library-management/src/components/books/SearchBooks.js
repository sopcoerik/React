import { useBooksContext } from "../../hooks/useBooksContext";

function SearchBooks() {
  const { searchTerm, setSearchTerm } = useBooksContext();

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex">
      <label>Search:</label>
      <input
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="w-full border"
      />
    </div>
  );
}

export default SearchBooks;
