import { useAuthorsContext } from "../../hooks/useAuthorsContext";

function SearchAuthors() {
  const { searchTerm, setSearchTerm } = useAuthorsContext();

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

export default SearchAuthors;
