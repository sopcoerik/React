import { useState } from "react";
import CategoriesList from "../../components/categories/CategoriesList";

import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import { useSelector } from "react-redux";

import {
  useFetchCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store";

import Loader from "../../components/common/Loader";
import Input from "../../components/common/Input";

import { Formik, Form } from "formik";

function CategoriesPage() {
  const { data: categories, categoriesAreLoading } = useFetchCategoriesQuery();

  const [addCategory] = useAddCategoryMutation();

  const [editCategory] = useEditCategoryMutation();

  const [deleteCategory] = useDeleteCategoryMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [categoryToEditId, setCategoryToEditId] = useState(undefined);

  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const handleFormSubmit = (name) => {
    categoryToEditId
      ? editCategory({
          id: categoryToEditId,
          newCategory: { name, createdById: activeUser.id },
        })
      : addCategory &&
        addCategory({
          name,
          createdById: activeUser.id,
        });

    setModalIsOpen(false);
  };
  const categoryToEdit = categories?.find((cat) => cat.id === categoryToEditId);
  const formInitialValues = {
    category: categoryToEdit?.name || "",
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

      <Modal
        isOpen={modalIsOpen}
        onOk={handleFormSubmit}
        onCancel={() => setModalIsOpen(false)}
      >
        <Formik
          initialValues={formInitialValues}
          onSubmit={(values, actions) => {
            handleFormSubmit(values.category);
            actions.resetForm({
              values: {
                category: "",
              },
            });
          }}
        >
          <Form className="p-10 flex flex-col gap-5 items-center">
            <Input
              name="category"
              type="text"
              label="Category Name"
              placeholder="Category Name"
              className={`border rounded border-slate-200 px-1 py-3`}
            />
            <Button
              className="absolute -translate-x-2/4 -translate-y-2/4 bottom-6 -right-3"
              type="submit"
            >
              Ok
            </Button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default CategoriesPage;
