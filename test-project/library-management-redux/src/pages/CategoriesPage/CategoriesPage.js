import { useState } from "react";
import CategoriesList from "../../components/categories/CategoriesList";
import SearchCategories from "../../components/categories/SearchCategories";
import { useCategories } from "../../hooks/useCategories";
import axios from "axios";
import Modal from "../../components/utils/Modal";
import Form from "../../components/utils/Form";
import SortCategories from "../../components/categories/SortCategories";
import {
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store";
import Loader from "../../components/utils/Loader";

function CategoriesPage() {
  const { data, isLoading, error } = useFetchCategoriesQuery();

  const [addCategory, addResponse] = useAddCategoryMutation();
  const { isLoading: addIsLoading } = addResponse;

  const [editCategory, editResponse] = useEditCategoryMutation();
  const { isLoading: editIsLoading } = editResponse;

  const [deleteCategory, deleteResponse] = useDeleteCategoryMutation();
  const { isLoading: deleteIsLoading } = deleteResponse;

  const [searchTerm, setSearchTerm] = useState("");

  const [sortedCategories, setSortedCategories] = useState([]);

  const [modal, setModal] = useState(false);
  const [categoryObj, setCategory] = useState({});

  return (
    <div>
      <div className="container mx-auto">
        <SearchCategories term={searchTerm} setTerm={setSearchTerm} />
      </div>
      {isLoading && (
        <div className="container mx-auto">
          <div className="h-56 flex justify-center items-center">
            Loading Data...
            <Loader />
          </div>
        </div>
      )}
      {!isLoading && (
        <div>
          <div className="container mx-auto">
            <SortCategories
              categories={data}
              setSortedCategories={setSortedCategories}
            />
          </div>
          <div className="container mx-auto">
            <CategoriesList
              searchTerm={searchTerm}
              setModal={setModal}
              setCategory={setCategory}
              deleteCategory={deleteCategory}
              categories={sortedCategories.length > 0 ? sortedCategories : data}
              addIsLoading={addIsLoading}
              editIsLoading={editIsLoading}
              deleteIsLoading={deleteIsLoading}
            />
          </div>
        </div>
      )}
      {modal && (
        <Modal setModal={setModal}>
          <Form
            setModal={setModal}
            addCategory={addCategory}
            editCategory={editCategory}
            categoryToEdit={categoryObj}
            category
          />
        </Modal>
      )}
    </div>
  );
}

export default CategoriesPage;
