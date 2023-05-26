import { useState } from "react";
import { useTheme } from "../../hooks/useTheme";

function FilterBooks({ categories, setSelectedCategoriesIds }) {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();

  const handleCheckboxChange = (id) => {
    if (!checked) {
      setChecked(true);
      setSelectedCategoriesIds([id]);
    } else {
      setChecked(false);
      setSelectedCategoriesIds([]);
    }
  };
  const renderedCategories = categories?.map((category) => (
    <div key={category.id}>
      <input
        type="checkbox"
        onClick={() => handleCheckboxChange(category.id)}
      />
      &nbsp;{category.name}
    </div>
  ));

  return (
    <div className={`${theme === "dark" ? "bg-black text-white" : ""}`}>
      <div>
        <label>Filter Books By Category: &nbsp;</label>
        <div className={`flex justify-around flex-wrap`}>
          {renderedCategories}
        </div>
      </div>
    </div>
  );
}

export default FilterBooks;
