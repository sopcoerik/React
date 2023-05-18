import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";
import { useTheme } from "../../hooks/useTheme";

function SortAuthors({ authors, setSortedAuthors }) {
  const authorsCopy = [...authors];
  const [sortOrder, setSortOrder] = useState(1);
  const theme = useTheme();

  authorsCopy.sort((a, b) => a.name.localeCompare(b.name) * sortOrder);

  const handleListSort = () => {
    sortOrder === 1 ? setSortOrder(-1) : setSortOrder(1);
    setSortedAuthors(authorsCopy);
  };

  return (
    <div className={`${theme === "dark" && "bg-black text-white"}`}>
      <button onClick={handleListSort} className="flex items-center">
        Sort |{sortOrder === 1 ? <GoChevronDown /> : <GoChevronUp />}
      </button>
    </div>
  );
}

export default SortAuthors;
