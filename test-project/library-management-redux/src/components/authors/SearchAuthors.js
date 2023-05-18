import { useTheme } from "../../hooks/useTheme";

function SearchAuthors({ term, setTerm }) {
  const handleSearchTermChange = (e) => {
    setTerm(e.target.value);
  };

  const theme = useTheme();

  return (
    <div
      className={`text-black flex my-2 p-5 ${
        theme === "dark" ? "bg-black text-white" : "bg-slate-200"
      } rounded`}
    >
      <label>Search:</label>
      <input
        value={term}
        onChange={handleSearchTermChange}
        className={`${
          theme === "dark" ? "bg-gray-700 text-white" : ""
        } w-full border border-gray-400 text-black ml-2`}
      />
    </div>
  );
}

export default SearchAuthors;
