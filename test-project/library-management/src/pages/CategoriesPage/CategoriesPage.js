import { useState } from "react";
import CategoriesList from "../../components/categories/CategoriesList";
import SearchCategories from "../../components/categories/SearchCategories";
import { useCategories } from "../../hooks/useCategories";
import axios from "axios";
import Modal from "../../components/utils/Modal";
import Form from "../../components/utils/Form";

function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    state: { data },
    setData,
  } = useCategories();
  const baseURL = "https://645e200d12e0a87ac0e837cd.mockapi.io/categories";
  const [modal, setModal] = useState(false);
  const [categoryObj, setCategory] = useState({});

  const addCategory = async (name) => {
    const response = await axios.post(baseURL, {
      name,
    });

    setData([...data, response.data]);
  };

  const editCategory = async (category, name) => {
    const response = await axios.put(`${baseURL}/${category.id}`, {
      name,
    });

    const categoryToReplace = data.find(
      (currentCategory) => currentCategory.id === category.id
    );
    const index = data.indexOf(categoryToReplace);
    const updatedCategories = data.map((currentCategory, i) =>
      i === index ? response.data : currentCategory
    );
    setData([...updatedCategories]);
  };

  const deleteCategory = async (category) => {
    await axios.delete(`${baseURL}/${category.id}`);

    const updatedCategories = data.filter(
      (currCategory) => category.id !== currCategory.id
    );
    setData([...updatedCategories]);
  };

  return (
    <div>
      <div className="container mx-auto">
        <SearchCategories term={searchTerm} setTerm={setSearchTerm} />
      </div>
      <div className="container mx-auto">
        <CategoriesList
          searchTerm={searchTerm}
          addCategory={addCategory}
          setModal={setModal}
          setCategory={setCategory}
          deleteCategory={deleteCategory}
          categories={data}
        />
      </div>
      {modal && (
        <Modal setModal={setModal}>
          <Form
            setModal={setModal}
            addCategory={addCategory}
            editCategory={editCategory}
            categoryToEdit={categoryObj}
            category
          />
        </Modal>
      )}
    </div>
  );
}

export default CategoriesPage;
