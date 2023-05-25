import { useState } from "react";

import AuthorsList from "../../components/authors/AuthorsList";

import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import { Formik, Form } from "formik";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import { useSelector } from "react-redux";

import {
  useFetchAuthorsQuery,
  useAddAuthorsMutation,
  useEditAuthorMutation,
  useDeleteAuthorsMutation,
} from "../../store";

function AuthorsPage() {
  const { data: authors, isLoading, error } = useFetchAuthorsQuery();

  const [addNewAuthor] = useAddAuthorsMutation();

  const [editAuthor] = useEditAuthorMutation();

  const [deleteAuthor] = useDeleteAuthorsMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authorToEditId, setAuthorToEditId] = useState({});

  const authorToEdit = authors?.find((auth) => auth.id === authorToEditId);

  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const handleFormSubmit = (name) => {
    authorToEditId
      ? editAuthor({
          id: authorToEditId,
          newAuthor: { name, createdById: activeUser.id },
        })
      : addNewAuthor({ name, createdById: activeUser.id });

    setModalIsOpen(false);
  };

  const formInitialValues = {
    author: authorToEdit?.name || "",
  };

  let content;

  if (isLoading) {
    content = (
      <div className="w-full h-56 flex justify-center items-center">
        Loading Data...
        <Loader />
      </div>
    );
  } else if (error) {
    content = <div>Error Loading Authors...</div>;
  } else {
    content = (
      <div>
        <div>
          <AuthorsList
            authors={authors}
            setModal={setModalIsOpen}
            setAuthorToEditId={setAuthorToEditId}
            deleteAuthor={deleteAuthor}
            activeUser={activeUser}
          />
        </div>
        <Modal
          isOpen={modalIsOpen}
          onOk={handleFormSubmit}
          onCancel={() => setModalIsOpen(false)}
        >
          <Formik
            initialValues={formInitialValues}
            onSubmit={(values, actions) => {
              handleFormSubmit(values.author);
              actions.resetForm({
                values: {
                  author: "",
                },
              });
            }}
          >
            <Form className="p-10 flex flex-col gap-5 items-center">
              <Input
                name="author"
                type="text"
                label="Author Name"
                placeholder="Author Name"
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

  return <div className="container mx-auto">{content}</div>;
}

export default AuthorsPage;
