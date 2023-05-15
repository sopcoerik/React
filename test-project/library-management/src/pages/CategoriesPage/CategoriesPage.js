import { useState } from "react";
import CategoriesList from "../../components/categories/CategoriesList";
import SearchCategories from "../../components/categories/SearchCategories";
import { useCategories } from "../../hooks/useCategories";
import axios from "axios";

function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const { categories, setCategories } = useCategories();
  const baseURL = "https://645e200d12e0a87ac0e837cd.mockapi.io/categories";

  const addCategory = async (name) => {
    const response = await axios.post(baseURL, {
      name,
    });

    setCategories([...categories, response.data]);
  };

  const editCategory = async (category, name) => {
    const response = await axios.put(`${baseURL}/${category.id}`, {
      name,
    });

    const categoryToReplace = categories.find(
      (currentAuthor) => currentAuthor.id === category.id
    );
    const index = categories.indexOf(categoryToReplace);
    const updatedAuthors = categories.map((currentAuthor, i) =>
      i === index ? response.data : currentAuthor
    );
    setCategories(updatedAuthors);
  };

  return (
    <div>
      <div className="container mx-auto">
        <SearchCategories term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div className="container mx-auto">
        <CategoriesList searchTerm={searchTerm} addCategory={addCategory} />
      </div>
    </div>
  );
}

export default Categories;
