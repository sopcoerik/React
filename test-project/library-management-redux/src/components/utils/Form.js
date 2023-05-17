import axios from "axios";

import { useReducer } from "react";
import { useAuthors } from "../../hooks/useAuthors";
import { useCategories } from "../../hooks/useCategories";

import Dropdown from "./Dropdown";

import "./form.css";
import { useThemeContext } from "../../hooks/useThemeContext";

function Form({
  book,
  setModal,
  author,
  authorToEdit,
  editAuthor,
  addAuthor = undefined,
  addCategory,
  editCategory,
  categoryToEdit,
  category,
  addBook,
  editBook,
}) {
  const { theme } = useThemeContext();

  const {
    state: { data: authors },
  } = useAuthors();
  const {
    state: { data: categories },
  } = useCategories();

  const handleAddBook = (title, authorId, author, description, categoryId) => {
    addBook({
      title,
      authorId,
      author,
      description,
      categoryId,
    });
  };

  const handleEditBook = (
    book,
    title,
    authorId,
    author,
    description,
    categoryId
  ) => {
    editBook({
      id: book.id,
      title,
      authorId,
      author,
      description,
      categoryId,
    });
  };

  const CHANGE_TITLE = "change_title";
  const CHANGE_DESCRIPTION = "change_description";
  const CHANGE_SELECTED_AUTHOR = "change_selected_author";
  const CHANGE_AUTHOR = "change_author";
  const CHANGE_CATEGORY = "change_category";
  const CHANGE_SELECTED_CATEGORY = "change_selected_category";

  const formReducer = (state, action) => {
    switch (action.type) {
      case CHANGE_TITLE:
        return {
          title: action.payload,
          description: state.description,
          selectedAuthor: state.selectedAuthor,
          author: state.author,
          category: state.category,
          selectedCategory: state.selectedCategory,
        };
      case CHANGE_DESCRIPTION:
        return {
          title: state.title,
          description: action.payload,
          selectedAuthor: state.selectedAuthor,
          author: state.author,
          category: state.category,
          selectedCategory: state.selectedCategory,
        };
      case CHANGE_SELECTED_AUTHOR:
        return {
          title: state.title,
          description: state.description,
          selectedAuthor: action.payload,
          author: state.author,
          category: state.category,
          selectedCategory: state.selectedCategory,
        };
      case CHANGE_AUTHOR:
        return {
          title: state.title,
          description: state.description,
          selectedAuthor: state.selectedAuthor,
          author: action.payload,
          category: state.category,
          selectedCategory: state.selectedCategory,
        };
      case CHANGE_CATEGORY:
        return {
          title: state.title,
          description: state.description,
          selectedAuthor: state.selectedAuthor,
          author: state.author,
          category: action.payload,
          selectedCategory: state.selectedCategory,
        };
      case CHANGE_SELECTED_CATEGORY:
        return {
          title: state.title,
          description: state.description,
          selectedAuthor: state.selectedAuthor,
          author: state.author,
          category: state.category,
          selectedCategory: action.payload,
        };
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(formReducer, {
    title: book?.title || "",
    description: book?.description || "",
    selectedAuthor: {},
    author: authorToEdit?.name || "",
    category: categoryToEdit?.name || "",
    selectedCategory: categoryToEdit || {},
  });

  const handleTitleChange = (e) => {
    dispatch({
      type: CHANGE_TITLE,
      payload: e.target.value,
    });
  };

  const setSelectedAuthor = (value) => {
    dispatch({
      type: CHANGE_SELECTED_AUTHOR,
      payload: value,
    });
  };

  const handleDescriptionChange = (e) => {
    dispatch({
      type: CHANGE_DESCRIPTION,
      payload: e.target.value,
    });
  };

  const handleAuthorChange = (e) => {
    dispatch({
      type: CHANGE_AUTHOR,
      payload: e.target.value,
    });
  };

  const setSelectedCategory = (value) => {
    dispatch({
      type: CHANGE_SELECTED_CATEGORY,
      payload: value,
    });
  };

  const handleCategoryChange = (e) => {
    dispatch({
      type: CHANGE_CATEGORY,
      payload: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    (categoryToEdit &&
      editCategory({ categoryToEdit, newCategory: state.category })) ||
      (addCategory && addCategory(state.category)) ||
      (authorToEdit && editAuthor({ authorToEdit, newName: state.author })) ||
      (addAuthor && addAuthor(state.author)) ||
      (book
        ? handleEditBook(
            book,
            state.title,
            state.selectedAuthor.id,
            state.selectedAuthor.name,
            state.description,
            state.selectedCategory.id
          )
        : handleAddBook(
            state.title,
            state.selectedAuthor.id,
            state.selectedAuthor.name,
            state.description,
            state.selectedCategory.id
          ));

    setModal(false);
  };

  const handleCancelForm = () => {
    setModal(false);
  };
  let content;
  content = category ? (
    <div
      className={`rounded border ${
        theme === "dark" ? "text-white bg-black" : "bg-white"
      } absolute min-w-600 min-h-300 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 frm`}
    >
      <form
        onSubmit={handleFormSubmit}
        className="p-10 flex flex-col gap-5 items-center"
      >
        <input
          value={state.category}
          type="text"
          placeholder="Category Name"
          onChange={handleCategoryChange}
          className={`border rounded border-slate-200 px-1 py-3 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
        <button
          className="border rounded border-slate-200 py-1 w-24 hover:bg-blue-300 hover:text-white"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  ) : author ? (
    <div
      className={`rounded border ${
        theme === "dark" ? "text-white bg-black" : "bg-white"
      } absolute min-w-600 min-h-300 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4`}
    >
      <form
        onSubmit={handleFormSubmit}
        className="p-10 flex flex-col gap-5 items-center"
      >
        <input
          value={state.author}
          type="text"
          placeholder="Author Name"
          onChange={handleAuthorChange}
          className={`border rounded border-slate-200 px-1 py-3 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
        <button
          className="border rounded border-slate-200 py-1 w-24 hover:bg-blue-300 hover:text-white"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  ) : (
    <div
      className={`rounded border ${
        theme === "dark" ? "text-white bg-black" : "bg-white"
      } absolute min-w-600 min-h-300 left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4`}
    >
      <form
        onSubmit={handleFormSubmit}
        className="p-10 flex flex-col gap-5 items-center"
      >
        <input
          value={state.title}
          type="text"
          placeholder="Book Title"
          onChange={handleTitleChange}
          className={`border rounded border-slate-200 px-1 py-3 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
        <Dropdown
          author
          options={authors}
          book={book}
          setSelectedAuthor={setSelectedAuthor}
        />
        <input
          value={state.description}
          type="text"
          placeholder="Book Description"
          onChange={handleDescriptionChange}
          className={`border rounded border-slate-200 px-1 py-3 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
        <Dropdown
          category
          options={categories}
          book={book}
          setSelectedCategory={setSelectedCategory}
        />
        <button
          className="border rounded border-slate-200 py-1 w-24 hover:bg-blue-300 hover:text-white"
          onClick={handleFormSubmit}
        >
          Submit
        </button>
      </form>
      <button
        onClick={handleCancelForm}
        className="m-2 border rounded border-slate-200 py-1 w-24 hover:bg-red-300 hover:text-white"
      >
        Cancel
      </button>
    </div>
  );

  return content;
}

export default Form;
