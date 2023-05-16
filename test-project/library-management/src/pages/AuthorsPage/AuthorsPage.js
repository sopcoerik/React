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
  const {
    state: { data },
    setData,
  } = useAuthors();
  const [modal, setModal] = useState(false);
  const [authorObj, setAuthorName] = useState({});

  const addAuthor = async (name) => {
    const response = await axios.post(
      "https://645e200d12e0a87ac0e837cd.mockapi.io/authors",
      {
        name,
      }
    );

    setData([...data, response.data]);
  };

  const editAuthor = async (author, name) => {
    const response = await axios.put(
      `https://645e200d12e0a87ac0e837cd.mockapi.io/authors/${author.id}`,
      {
        name,
      }
    );

    const authorToReplace = data.find(
      (currentAuthor) => currentAuthor.id === author.id
    );
    const index = data.indexOf(authorToReplace);
    const updatedAuthors = data.map((currentAuthor, i) =>
      i === index ? response.data : currentAuthor
    );
    setData(updatedAuthors);
  };

  const deleteAuthor = async (author) => {
    await axios.delete(
      `https://645e200d12e0a87ac0e837cd.mockapi.io/authors/${author.id}`
    );

    const updatedAuthors = data.filter(
      (currentAuthor) => currentAuthor.id !== author.id
    );
    setData(updatedAuthors);
  };

  return (
    <div className="container mx-auto">
      <div>
        <SearchAuthors term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div>
        <SortAuthors authors={data} setAuthors={setData} />
      </div>
      <div>
        <AuthorsList
          searchTerm={searchTerm}
          authors={data}
          setAuthors={setData}
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
