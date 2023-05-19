import { useState } from "react";

import AuthorsList from "../../components/authors/AuthorsList";
import SearchAuthors from "../../components/authors/SearchAuthors";

import Modal from "../../components/utils/Modal";
import Form from "../../components/utils/Form";
import SortAuthors from "../../components/authors/SortAuthors";
import Loader from "../../components/utils/Loader";

import { useSelector } from "react-redux";

import {
  useFetchAuthorsQuery,
  useAddAuthorsMutation,
  useEditAuthorMutation,
  useDeleteAuthorsMutation,
} from "../../store";

function AuthorsPage() {
  const { data, isLoading, error } = useFetchAuthorsQuery();

  const [addNewAuthor, addNewAuthorResponse] = useAddAuthorsMutation();
  const { isLoading: addIsLoading } = addNewAuthorResponse;

  const [editAuthor, editAuthorResponse] = useEditAuthorMutation();
  const { isLoading: editIsLoading } = editAuthorResponse;

  const [deleteAuthor, deleteResponse] = useDeleteAuthorsMutation();
  const { isLoading: deleteIsLoading } = deleteResponse;

  const [searchTerm, setSearchTerm] = useState("");
  const [modal, setModal] = useState(false);
  const [authorToEdit, setAuthorToEdit] = useState({});
  const [sortedAuthors, setSortedAuthors] = useState([]);

  const activeUser = useSelector((state) => state.activeUser.activeUser);

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
          <SortAuthors authors={data} setSortedAuthors={setSortedAuthors} />
        </div>
        <div>
          <AuthorsList
            searchTerm={searchTerm}
            authors={sortedAuthors.length > 0 ? sortedAuthors : data}
            setModal={setModal}
            setAuthorToEdit={setAuthorToEdit}
            deleteAuthor={deleteAuthor}
            addIsLoading={addIsLoading}
            editIsLoading={editIsLoading}
            deleteIsLoading={deleteIsLoading}
            activeUser={activeUser}
          />
        </div>
        {modal && (
          <Modal setModal={setModal}>
            <Form
              setModal={setModal}
              author
              authorToEdit={authorToEdit}
              addAuthor={addNewAuthor}
              editAuthor={editAuthor}
              activeUser={activeUser}
            />
          </Modal>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div>
        <SearchAuthors term={searchTerm} setTerm={setSearchTerm} />
      </div>
      {content}
    </div>
  );
}

export default AuthorsPage;
