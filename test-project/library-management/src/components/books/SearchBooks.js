import { useThemeContext } from "../../hooks/useThemeContext";

function SearchBooks({ term, setTerm }) {
  const { theme } = useThemeContext();

  const handleSearchTermChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div
      className={`flex my-2 p-5 ${
        theme === "dark" ? "bg-black" : "bg-slate-200"
      }  rounded`}
    >
      <label>Search:</label>
      <input
        value={term}
        onChange={handleSearchTermChange}
        className="w-full border border-gray-400 ml-2"
      />
    </div>
  );
}

export default SearchBooks;
