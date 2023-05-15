import { useState, useEffect } from "react";
import axios from "axios";

export function useCategories() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await axios.get(
      "https://645e200d12e0a87ac0e837cd.mockapi.io/categories"
    );

    setCategories(response.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    setCategories,
  };
}
