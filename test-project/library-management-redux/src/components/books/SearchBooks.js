import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import Button from "../common/Button";

function SearchBooks({ setTerm }) {
  const theme = useTheme();

  const [localTerm, setLocalTerm] = useState("");

  const handleSearchTermChange = (e) => {
    setLocalTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTerm(localTerm);
  };

  return (
    <div
      className={`my-2 p-5 ${
        theme === "dark" ? "bg-black text-white" : "bg-slate-200"
      }  rounded`}
    >
      <form onSubmit={handleSubmit} className="flex w-full">
        <label>Search:</label>
        <input
          value={localTerm}
          onChange={handleSearchTermChange}
          className={`w-full border border-gray-400 ml-2 ${
            theme === "dark" && "bg-black text-white"
          } px-3 outline-none`}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}

export default SearchBooks;
