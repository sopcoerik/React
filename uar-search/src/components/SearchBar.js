import { useState } from "react";
import "../css/SearchBar.css";

function SearchBar({ onSubmit }) {
  const [searchedTerm, setSearchedTerm] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchedTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(searchedTerm);
  };

  return (
    <div className="form--container">
      <form onSubmit={handleSubmit}>
        <label>Enter a keyword to search:</label>
        <br />
        <input onChange={handleChange} />
      </form>
    </div>
  );
}

export default SearchBar;
