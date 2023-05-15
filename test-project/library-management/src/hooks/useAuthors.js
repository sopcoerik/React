import { useState, useEffect } from "react";
import axios from "axios";

export function useAuthors() {
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    const response = await axios.get(
      "https://645e200d12e0a87ac0e837cd.mockapi.io/authors"
    );

    setAuthors(response.data);
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

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

  return {
    authors,
    setAuthors,
    addAuthor,
    editAuthor,
    deleteAuthor,
  };
}
