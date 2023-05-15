function SearchAuthors({ term, setTerm }) {
  const handleSearchTermChange = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div className="flex">
      <label>Search:</label>
      <input
        value={term}
        onChange={handleSearchTermChange}
        className="w-full border"
      />
    </div>
  );
}

export default SearchAuthors;
