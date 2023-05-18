import { useTheme } from "../../hooks/useTheme";

function SearchCategories({ term, setTerm }) {
  const handleSearchTermChange = (e) => {
    setTerm(e.target.value);
  };

  const theme = useTheme();

  return (
    <div
      className={`flex my-2 p-5 ${
        theme === "dark" ? "bg-black text-white" : "bg-slate-200"
      } rounded`}
    >
      <label>Search:</label>
      <input
        value={term}
        onChange={handleSearchTermChange}
        className={`${
          theme === "dark" && "bg-black text-white"
        } w-full border border-gray-400 ml-2`}
      />
    </div>
  );
}

export default SearchCategories;
