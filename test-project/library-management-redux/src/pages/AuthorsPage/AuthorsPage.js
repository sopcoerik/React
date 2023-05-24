import { useState } from "react";

import AuthorsList from "../../components/authors/AuthorsList";

import Loader from "../../components/common/Loader";
import Modal from "../../components/common/Modal";
import Overlay from "../../components/common/Overlay";

import { useSelector } from "react-redux";

import {
  useFetchAuthorsQuery,
  useAddAuthorsMutation,
  useEditAuthorMutation,
  useDeleteAuthorsMutation,
} from "../../store";
import { useTheme } from "../../hooks/useTheme";

function AuthorsPage() {
  const theme = useTheme();

  const { data, isLoading, error } = useFetchAuthorsQuery();

  const [addNewAuthor] = useAddAuthorsMutation();

  const [editAuthor] = useEditAuthorMutation();

  const [deleteAuthor] = useDeleteAuthorsMutation();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [authorToEdit, setAuthorToEdit] = useState({});

  const [authorInput, setAuthorInput] = useState(authorToEdit.name || "");

  const activeUser = useSelector((state) => state.activeUser.activeUser);

  const handleFormInputsChange = (e) => {
    setAuthorInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    authorToEdit
      ? editAuthor({
          id: authorToEdit.id,
          newAuthor: { name: authorInput, createdById: activeUser.id },
        })
      : addNewAuthor({ name: authorInput, createdById: activeUser.id });

    setModalIsOpen(false);
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
            authors={data}
            setModal={setModalIsOpen}
            setAuthorToEdit={setAuthorToEdit}
            deleteAuthor={deleteAuthor}
            activeUser={activeUser}
          />
        </div>
        <Overlay isOpen={modalIsOpen} setModal={setModalIsOpen} />
        <Modal isOpen={modalIsOpen} onOk={handleFormSubmit}>
          <form className="p-10 flex flex-col gap-5 items-center">
            <input
              value={authorInput}
              name="author"
              type="text"
              placeholder="Author Name"
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

  return <div className="container mx-auto">{content}</div>;
}

export default AuthorsPage;
