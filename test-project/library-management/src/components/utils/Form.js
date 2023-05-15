import axios from "axios";

import { useReducer } from "react";
import { useAuthors } from "../../hooks/useAuthors";

import Dropdown from "./Dropdown";

import "./form.css";
import { useThemeContext } from "../../hooks/useThemeContext";

function Form({
  book,
  setModal,
  setBooks,
  books,
  author,
  authorObj,
  editAuthor,
  addAuthor = undefined,
}) {
  const { theme } = useThemeContext();

  const { authors } = useAuthors();
  const booksURL = "https://645e200d12e0a87ac0e837cd.mockapi.io/books";

  const addBook = async (title, authorId, author, description) => {
    const response = await axios.post(booksURL, {
      title,
      authorId,
      author,
      description,
    });

    setBooks([...books, response.data]);
  };

  const editBook = async (book, title, authorId, author, description) => {
    const response = await axios.put(`${booksURL}/${book.id}`, {
      title,
      authorId,
      author,
      description,
    });

    const findBook = books.find((book) => book.id === response.data.id);
    const index = books.indexOf(findBook);
    const updatedBooks = books.map((book, i) =>
      i === index ? response.data : book
    );
    setBooks(updatedBooks);
  };

  const CHANGE_TITLE = "change_title";
  const CHANGE_DESCRIPTION = "change_description";
  const CHANGE_SELECTED_AUTHOR = "change_selected_author";
  const CHANGE_AUTHOR = "change_author";

  const formReducer = (state, action) => {
    switch (action.type) {
      case CHANGE_TITLE:
        return {
          title: action.payload,
          description: state.description,
          selectedAuthor: state.selectedAuthor,
          author: state.author,
        };
      case CHANGE_DESCRIPTION:
        return {
          title: state.title,
          description: action.payload,
          selectedAuthor: state.selectedAuthor,
          author: state.author,
        };
      case CHANGE_SELECTED_AUTHOR:
        return {
          title: state.title,
          description: state.description,
          selectedAuthor: action.payload,
          author: state.author,
        };
      case CHANGE_AUTHOR:
        return {
          title: state.title,
          description: state.description,
          selectedAuthor: state.selectedAuthor,
          author: action.payload,
        };
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(formReducer, {
    title: book?.title || "",
    description: book?.description || "",
    selectedAuthor: {},
    author: authorObj?.name || "",
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    (authorObj && editAuthor(authorObj, state.author)) ||
      (addAuthor !== undefined && addAuthor(state.author)) ||
      (book
        ? editBook(
            book,
            state.title,
            state.selectedAuthor.id,
            state.selectedAuthor.name,
            state.description
          )
        : addBook(
            state.title,
            state.selectedAuthor.id,
            state.selectedAuthor.name,
            state.description
          ));

    setModal(false);
  };

  const handleCancelForm = () => {
    setModal(false);
  };
  let content;
  content = author ? (
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
