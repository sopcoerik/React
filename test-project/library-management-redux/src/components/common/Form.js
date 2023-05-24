import { useState } from "react";

import Dropdown from "./Dropdown";

import "./form.css";
import { useTheme } from "../../hooks/useTheme";

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
  activeUser,
  authors,
  categories,
}) {
  const theme = useTheme();

  const [state, setState] = useState({
    title: book?.title || "",
    description: book?.description || "",
    selectedAuthor: {},
    author: authorToEdit?.name || "",
    category: categoryToEdit?.name || "",
    selectedCategory: categoryToEdit || {},
  });

  const handleFormInputsChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleAuthorChange = (value) => {
    setState({ ...state, selectedAuthor: value });
  };

  const handleCategoryChange = (value) => {
    setState({ ...state, selectedCategory: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    (categoryToEdit &&
      editCategory({
        id: categoryToEdit.id,
        newCategory: { name: state.category, createdById: activeUser.id },
      })) ||
      (addCategory &&
        addCategory({
          name: state.category,
          createdById: activeUser.id,
        })) ||
      (authorToEdit &&
        editAuthor({
          id: authorToEdit.id,
          newAuthor: { name: state.author, createdById: activeUser.id },
        })) ||
      (addAuthor &&
        addAuthor({ name: state.author, createdById: activeUser.id })) ||
      (book
        ? editBook({
            id: book.id,
            newBook: {
              title: state.title,
              authorId: state.selectedAuthor.id,
              author: state.selectedAuthor.name,
              description: state.description,
              categoryId: state.selectedCategory.id,
              createdById: activeUser.id,
            },
          })
        : addBook({
            title: state.title,
            authorId: state.selectedAuthor.id,
            author: state.selectedAuthor.name,
            description: state.description,
            categoryId: state.selectedCategory.id,
            createdById: activeUser.id,
          }));

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
          name="category"
          type="text"
          placeholder="Category Name"
          onChange={handleFormInputsChange}
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
          name="author"
          type="text"
          placeholder="Author Name"
          onChange={handleFormInputsChange}
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
          name="title"
          type="text"
          placeholder="Book Title"
          onChange={handleFormInputsChange}
          className={`border rounded border-slate-200 px-1 py-3 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
        <Dropdown
          author
          options={authors}
          book={book}
          setSelectedAuthor={handleAuthorChange}
        />
        <input
          value={state.description}
          name="description"
          type="text"
          placeholder="Book Description"
          onChange={handleFormInputsChange}
          className={`border rounded border-slate-200 px-1 py-3 ${
            theme === "dark" ? "bg-black text-white" : "bg-white text-black"
          }`}
        />
        <Dropdown
          category
          options={categories}
          book={book}
          setSelectedCategory={handleCategoryChange}
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
