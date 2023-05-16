import { useState } from "react";
import { useCategories } from "../../hooks/useCategories";

function FilterBooks({ books, getFilteredBooks, filtered }) {
  const [checked, setChecked] = useState(false);

  const {
    state: { data: categories },
  } = useCategories();

  const handleCheckboxChange = (id) => {
    const newCheck = books.filter((book) => book.categoryId === id);
    const present = (book) => filtered.includes(book);

    if (!checked && newCheck.some(present)) {
      const unchecked = filtered.filter((book) => book.categoryId !== id);
      console.log(unchecked);
      getFilteredBooks(unchecked);
    } else if (!checked || !newCheck.some(present)) {
      setChecked(true);
      const newFilteredBooks = Array.from(new Set([...filtered, ...newCheck]));
      getFilteredBooks(newFilteredBooks);
    } else if (checked && newCheck.some(present)) {
      setChecked(false);
      const unchecked = filtered.filter((book) => book.categoryId !== id);
      console.log(unchecked);
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
    <div>
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
