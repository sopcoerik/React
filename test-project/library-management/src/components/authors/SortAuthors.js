import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function SortAuthors({ authors, setAuthors }) {
  const authorsCopy = [...authors];
  const [sortOrder, setSortOrder] = useState(1);

  authorsCopy.sort((a, b) => a.name.localeCompare(b.name) * sortOrder);

  const handleListSort = () => {
    sortOrder === 1 ? setSortOrder(-1) : setSortOrder(1);
    setAuthors(authorsCopy);
  };

  return (
    <div>
      <button onClick={handleListSort} className="flex items-center">
        Sort |{sortOrder === 1 ? <GoChevronDown /> : <GoChevronUp />}
      </button>
    </div>
  );
}

export default SortAuthors;
