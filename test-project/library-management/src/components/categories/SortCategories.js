import { useState } from "react";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function SortAuthors({ categories, setCategories }) {
  const categoriesCopy = [...categories];
  const [sortOrder, setSortOrder] = useState(1);

  categoriesCopy.sort((a, b) => a.name.localeCompare(b.name) * sortOrder);

  const handleListSort = () => {
    sortOrder === 1 ? setSortOrder(-1) : setSortOrder(1);
    setCategories(categoriesCopy);
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
