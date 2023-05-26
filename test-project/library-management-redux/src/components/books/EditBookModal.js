import { useState } from "react";
import Modal from "../common/Modal";
import Dropdown from "../common/Dropdown";
import { Formik, Form } from "formik";
import Input from "../common/Input";

function EditBookModal({
  bookToEditId,
  editBook,
  addBook,
  isOpen,
  onCancel,
  onOk,
  activeUser,
  setBookToEditId,
  books,
  authors,
  categories,
}) {
  const bookToEdit = books?.find((book) => book.id === bookToEditId);

  const [bookFormState, setBookFormState] = useState({
    title: bookToEdit?.title || "",
    selectedAuthor: {},
    description: "",
    selectedCategory: {},
  });

  const handleFormInputsChange = (e) => {
    setBookFormState({ ...setBookFormState, [e.target.name]: e.target.value });
  };

  const handleAuthorChange = (value) => {
    setBookFormState({ ...bookFormState, selectedAuthor: value });
  };

  const handleCategoryChange = (value) => {
    setBookFormState({ ...bookFormState, selectedCategory: value });
  };

  const handleBookFormSubmit = (title, description) => {
    bookToEditId
      ? editBook({
          id: bookToEditId,
          newBook: {
            title,
            authorId: bookFormState.selectedAuthor?.id,
            author: bookFormState.selectedAuthor?.name,
            description,
            categoryId: bookFormState.selectedCategory?.id,
            createdById: activeUser.id,
          },
        })
      : addBook({
          title,
          authorId: bookFormState.selectedAuthor.id,
          author: bookFormState.selectedAuthor.name,
          description,
          categoryId: bookFormState.selectedCategory.id,
          createdById: activeUser.id,
        });

    setBookFormState({
      title: "",
      selectedAuthor: {},
      description: "",
      selectedCategory: {},
    });

    onOk();
    setBookToEditId(undefined);
  };

  const formInitialValues = {
    title: bookToEdit?.title || "",
    description: bookToEdit?.description || "",
  };

  return (
    <Formik
      initialValues={formInitialValues}
      onSubmit={(values, actions) => {
        handleBookFormSubmit(values.title, values.description);
        actions.resetForm({
          values: {
            title: "",
            description: "",
          },
        });
      }}
    >
      {({ handleSubmit }) => (
        <Modal
          isOpen={isOpen}
          onCancel={onCancel}
          onOk={handleSubmit}
          headerText={`Edit book`}
        >
          <Form className="p-10 flex flex-col gap-5 items-center w-full">
            <Input
              name="title"
              type="text"
              label="Book Title"
              placeholder="Book Title"
              onChange={handleFormInputsChange}
              className="border rounded border-slate-200 px-1 py-3"
            />
            <Dropdown
              author
              options={authors}
              setSelectedAuthor={handleAuthorChange}
              label={"Choose an Author"}
            />
            <Input
              name="description"
              type="text"
              label="Book Description"
              placeholder="Book Description"
              onChange={handleFormInputsChange}
              className={`border rounded border-slate-200 px-1 py-3`}
            />
            <Dropdown
              category
              options={categories}
              setSelectedCategory={handleCategoryChange}
              label={"Choose a Category"}
            />
          </Form>
        </Modal>
      )}
    </Formik>
  );
}

export default EditBookModal;
