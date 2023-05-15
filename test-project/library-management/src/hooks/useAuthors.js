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

  return {
    authors,
    setAuthors,
  };
}
