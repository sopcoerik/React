import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";
import { useTheme } from "../../hooks/useTheme";

function FilterBooks({ books, getFilteredBooks, filteredArray }) {
  const [checked, setChecked] = useState(false);
  const theme = useTheme();
  const {
    state: { data: categories },
  } = useCategories();

  const handleCheckboxChange = (id) => {
    const newCheck = books.filter((book) => book.categoryId === id);
    const present = (book) => filteredArray.includes(book);

    if (newCheck && !newCheck.some(present)) {
      setChecked(true);
      getFilteredBooks([...filteredArray, ...newCheck]);
    } else if (
      (newCheck && newCheck.some(present)) ||
      (newCheck && checked === false)
    ) {
      setChecked(false);
      const unchecked = filteredArray.filter(
        (book) => !newCheck.includes(book)
      );
      getFilteredBooks(unchecked);
    }
  };

  const renderedCategories = categories.map((category) => (
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
