import { useCategories } from "../../hooks/useCategories";
import { useThemeContext } from "../../hooks/useThemeContext";
import Loader from "../utils/Loader";

function CategoriesList({
  searchTerm,
  setModal,
  setCategory,
  deleteCategory,
  categories,
}) {
  const { theme } = useThemeContext();
  const {
    state: { isLoading, error },
  } = useCategories();

  const handleEditCategoryClick = (category) => {
    setCategory(category);
    setModal(true);
  };
  const handleDeleteCategoryClick = (category) => {
    deleteCategory(category);
  };

  const handleAddCategoryClick = () => {
    setCategory("");
    setModal(true);
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

  let content;

  if (isLoading) {
    content = (
      <div className="w-full h-52 flex items-center justify-center">
        Loading Data...
        <Loader />
      </div>
    );
  } else if (error) {
    content = (
      <div className="w-full h-52 flex items-center justify-center text-red-900">
        Error Loading Data...
      </div>
    );
  } else {
    content = <div>{renderedCategories}</div>;
  }

  return (
    <div className={`${theme ? "bg-dark" : "bg-slate-200"} -mt-4 p-2`}>
      {content}
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
