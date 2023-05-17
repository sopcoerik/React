import { useState } from "react";

import AuthorsList from "../../components/authors/AuthorsList";
import SearchAuthors from "../../components/authors/SearchAuthors";
import { useAuthors } from "../../hooks/useAuthors";

import Modal from "../../components/utils/Modal";
import Form from "../../components/utils/Form";
import SortAuthors from "../../components/authors/SortAuthors";

function AuthorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    state: { data },
    addAuthor,
    editAuthor,
    deleteAuthor,
  } = useAuthors();
  const [modal, setModal] = useState(false);
  const [authorObj, setAuthorName] = useState({});

  return (
    <div className="container mx-auto">
      <div>
        <SearchAuthors term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div>
        <SortAuthors authors={data} />
      </div>
      <div>
        <AuthorsList
          searchTerm={searchTerm}
          authors={data}
          deleteAuthor={deleteAuthor}
          setModal={setModal}
          setAuthorName={setAuthorName}
        />
      </div>
      {modal && (
        <Modal setModal={setModal}>
          <Form
            setModal={setModal}
            author
            authorObj={authorObj}
            editAuthor={editAuthor}
            addAuthor={addAuthor}
          />
        </Modal>
      )}
    </div>
  );
}

export default AuthorsPage;
