import { useTheme } from "../../hooks/useTheme";
import Loader from "../utils/Loader";

function CategoriesList({
  searchTerm,
  setModal,
  setCategory,
  deleteCategory,
  categories,
  addIsLoading,
  editIsLoading,
  deleteIsLoading,
  activeUser,
}) {
  const theme = useTheme();

  const handleEditCategoryClick = (category) => {
    setCategory(category);
    setModal(true);
  };
  const handleDeleteCategoryClick = (id) => {
    deleteCategory(id);
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
          <div className="h-10">
            {activeUser && (
              <>
                <button
                  onClick={() => handleEditCategoryClick(category)}
                  className="px-3 py-1 border border-slate-300 rounded hover:bg-blue-300 mb-2 hover:text-white"
                  disabled={editIsLoading}
                >
                  {editIsLoading ? <Loader /> : "Edit Category"}
                </button>
                <button
                  onClick={() => handleDeleteCategoryClick(category.id)}
                  className="px-3 py-1 ml-3 border border-slate-300 rounded hover:bg-red-300 mb-2 hover:text-white"
                  disabled={deleteIsLoading}
                >
                  {deleteIsLoading ? <Loader /> : "Delete"}
                </button>
              </>
            )}
          </div>
        </div>
      )
  );

  return (
    <div
      className={`${
        theme === "dark" ? "bg-black text-white" : "bg-slate-200"
      } p-2`}
    >
      <div className="p-2 font-bold text-lg">Name</div>
      <div>{renderedCategories}</div>
      <div className="flex justify-end m-2">
        {activeUser && (
          <button
            className="px-3 py-1 border rounded hover:bg-blue-300 hover:text-white"
            onClick={handleAddCategoryClick}
            disabled={addIsLoading}
          >
            {addIsLoading ? <Loader /> : "+ Add Category"}
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoriesList;
