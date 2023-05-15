import { useState } from "react";
import axios from "axios";

import AuthorsList from "../../components/authors/AuthorsList";
import SearchAuthors from "../../components/authors/SearchAuthors";
import { useAuthors } from "../../hooks/useAuthors";

import Modal from "../../components/utils/Modal";
import Form from "../../components/utils/Form";
import SortAuthors from "../../components/authors/SortAuthors";

function AuthorsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { authors, setAuthors } = useAuthors();
  const [modal, setModal] = useState(false);
  const [authorObj, setAuthorName] = useState({});

  const addAuthor = async (name) => {
    const response = await axios.post(
      "https://645e200d12e0a87ac0e837cd.mockapi.io/authors",
      {
        name,
      }
    );

    setAuthors([...authors, response.data]);
  };

  const editAuthor = async (author, name) => {
    const response = await axios.put(
      `https://645e200d12e0a87ac0e837cd.mockapi.io/authors/${author.id}`,
      {
        name,
      }
    );

    const authorToReplace = authors.find(
      (currentAuthor) => currentAuthor.id === author.id
    );
    const index = authors.indexOf(authorToReplace);
    const updatedAuthors = authors.map((currentAuthor, i) =>
      i === index ? response.data : currentAuthor
    );
    setAuthors(updatedAuthors);
  };

  const deleteAuthor = async (author) => {
    await axios.delete(
      `https://645e200d12e0a87ac0e837cd.mockapi.io/authors/${author.id}`
    );

    const updatedAuthors = authors.filter(
      (currentAuthor) => currentAuthor.id !== author.id
    );
    setAuthors(updatedAuthors);
  };

  return (
    <div className="container mx-auto">
      <div>
        <SearchAuthors term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div>
        <SortAuthors authors={authors} setAuthors={setAuthors} />
      </div>
      <div>
        <AuthorsList
          searchTerm={searchTerm}
          authors={authors}
          setAuthors={setAuthors}
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
