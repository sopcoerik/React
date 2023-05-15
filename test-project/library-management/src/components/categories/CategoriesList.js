import { useCategories } from "../../hooks/useCategories";
import { useThemeContext } from "../../hooks/useThemeContext";

function CategoriesList({ searchTerm, addCategory }) {
  const { theme } = useThemeContext();
  const { categories } = useCategories();

  const handleEditCategoryClick = () => {};
  const handleDeleteCategoryClick = () => {};

  const handleAddCategoryClick = () => {
    addCategory(searchTerm);
  };

  const renderedCategories = categories.map(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) && (
        <div
          key={category.id}
          className="m-2 border-b border-slate-300 flex justify-between items-center"
        >
          {category.name}
          <div>
            <button
              onClick={() => handleEditCategoryClick(category)}
              className="px-3 py-1 border border-slate-300 rounded hover:bg-blue-300 mb-2 hover:text-white"
            >
              Edit Category
            </button>
            <button
              onClick={() => handleDeleteCategoryClick(category)}
              className="px-3 py-1 ml-3 border border-slate-300 rounded hover:bg-red-300 mb-2 hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      )
  );

  return (
    <div className={`${theme ? "bg-dark" : "bg-slate-200"} -mt-4 p-2`}>
      <div>{renderedCategories}</div>
      <div className="flex justify-end m-2">
        <button
          className="px-3 py-1 border rounded hover:bg-blue-300 hover:text-white"
          onClick={handleAddCategoryClick}
        >
          + Add Category
        </button>
      </div>
    </div>
  );
}

export default CategoriesList;
