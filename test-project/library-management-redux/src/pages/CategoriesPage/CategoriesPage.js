import { useState } from "react";
import CategoriesList from "../../components/categories/CategoriesList";

import Modal from "../../components/common/Modal";
import Form from "../../components/common/Form";
import { useSelector } from "react-redux";

import {
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store";

import Loader from "../../components/common/Loader";

function CategoriesPage() {
  const { data, isLoading } = useFetchCategoriesQuery();

  const [addCategory, addResponse] = useAddCategoryMutation();
  const { isLoading: addIsLoading } = addResponse;

  const [editCategory, editResponse] = useEditCategoryMutation();
  const { isLoading: editIsLoading } = editResponse;

  const [deleteCategory, deleteResponse] = useDeleteCategoryMutation();
  const { isLoading: deleteIsLoading } = deleteResponse;

  const [modal, setModal] = useState(false);
  const [categoryObj, setCategory] = useState({});

  const activeUser = useSelector((state) => state.activeUser.activeUser);

  return (
    <div>
      {isLoading && (
        <div className="container mx-auto">
          <div className="h-56 flex justify-center items-center">
            Loading Data...
            <Loader />
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="container mx-auto">
          <div>
            <CategoriesList
              setModal={setModal}
              setCategory={setCategory}
              deleteCategory={deleteCategory}
              categories={data}
              addIsLoading={addIsLoading}
              editIsLoading={editIsLoading}
              deleteIsLoading={deleteIsLoading}
              activeUser={activeUser}
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
            activeUser={activeUser}
          />
        </Modal>
      )}
    </div>
  );
}

export default CategoriesPage;
