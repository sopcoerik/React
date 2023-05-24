import { useState } from "react";
import CategoriesList from "../../components/categories/CategoriesList";

import Modal from "../../components/common/Modal";
import Overlay from "../../components/common/Overlay";
import { useSelector } from "react-redux";
import { useTheme } from "../../hooks/useTheme";

import {
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store";

import Loader from "../../components/common/Loader";

function CategoriesPage() {
  const theme = useTheme();

  const { data: categories, categoriesAreLoading } = useFetchCategoriesQuery();

  const [addCategory] = useAddCategoryMutation();

  const [editCategory] = useEditCategoryMutation();

  const [deleteCategory] = useDeleteCategoryMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoryToEditId, setCategoryToEditId] = useState({});

  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const categoryToEdit = categories.find((cat) => cat.id === categoryToEditId);

  const [categoryInput, setCategoryInput] = useState(
    categoryToEdit?.name || ""
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();

    categoryToEditId
      ? editCategory({
          id: categoryToEditId,
          newCategory: { name: categoryInput, createdById: activeUser.id },
        })
      : addCategory &&
        addCategory({
          name: categoryInput,
          createdById: activeUser.id,
        });

    setModalIsOpen(false);
  };

  const handleFormInputsChange = (e) => {
    setCategoryInput(e.target.value);
  };

  return (
    <div>
      {categoriesAreLoading && (
        <div className="container mx-auto">
          <div className="h-56 flex justify-center items-center">
            Loading Data...
            <Loader />
          </div>
        </div>
      )}
      {!categoriesAreLoading && (
        <div className="container mx-auto">
          <div>
            <CategoriesList
              setModal={setModalIsOpen}
              setCategoryToEditId={setCategoryToEditId}
              deleteCategory={deleteCategory}
              categories={categories}
              activeUser={activeUser}
            />
          </div>
        </div>
      )}

      <Overlay isOpen={modalIsOpen} setModal={setModalIsOpen} />
      <Modal
        isOpen={modalIsOpen}
        onOk={handleFormSubmit}
        onCancel={() => setModalIsOpen(false)}
      >
        <form className="p-10 flex flex-col gap-5 items-center">
          <input
            value={categoryInput}
            name="category"
            type="text"
            placeholder="Category Name"
            onChange={handleFormInputsChange}
            className={`border rounded border-slate-200 px-1 py-3 ${
              theme === "dark" ? "bg-black text-white" : "bg-white text-black"
            }`}
          />
        </form>
      </Modal>
    </div>
  );
}

export default CategoriesPage;
