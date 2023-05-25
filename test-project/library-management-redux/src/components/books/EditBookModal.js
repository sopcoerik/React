// TODO: add functionality to edit book and add book here. passed prop is bookId or null if adding new book. this is smart component
// add formik. and use your input and modal components
// include book saving functionality here. on save, close modal and refetch books if rtk query doesn't do it automatically

import { useState } from "react";
import Modal from "../common/Modal";
import Dropdown from "../common/Dropdown";
import { Formik, Form } from "formik";
import Input from "../common/Input";
import Button from "../common/Button";

function EditBookModal({
  bookToEditId,
  editBook,
  addBook,
  modalIsOpen,
  setModalIsOpen,
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

    setModalIsOpen(false);
    setBookToEditId(undefined);
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onCancel={() => setModalIsOpen(false)}
      onOk={handleBookFormSubmit}
    >
      <>
        <Formik
          initialValues={{
            title: bookToEdit?.title || "",
            description: bookToEdit?.description || "",
          }}
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
          <Form className="p-10 flex flex-col gap-5 items-center">
            <Input
              name="title"
              type="text"
              label="Book Title"
              placeholder="Book Title"
              onChange={handleFormInputsChange}
              className={`border rounded border-slate-200 px-1 py-3`}
            />
            <label className="text-lg font-bold text-start w-full">
              Choose an Author
            </label>
            <Dropdown
              author
              options={authors}
              setSelectedAuthor={handleAuthorChange}
            />
            <Input
              name="description"
              type="text"
              label="Book Description"
              placeholder="Book Description"
              onChange={handleFormInputsChange}
              className={`border rounded border-slate-200 px-1 py-3`}
            />
            <label className="text-lg font-bold text-start w-full">
              Choose a Category
            </label>
            <Dropdown
              category
              options={categories}
              setSelectedCategory={handleCategoryChange}
            />
            <Button
              className="absolute -translate-x-2/4 -translate-y-2/4 bottom-6 -right-3"
              type="submit"
            >
              Ok
            </Button>
          </Form>
        </Formik>
      </>
    </Modal>
  );
}

export default EditBookModal;
