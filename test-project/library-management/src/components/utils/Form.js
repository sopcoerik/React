import { useReducer } from "react";
import { useBooksContext } from "../../hooks/useBooksContext";
import { useAuthorsContext } from "../../hooks/useAuthorsContext";
import Dropdown from "./Dropdown";

import "./form.css";
function Form({ book, setIsEdited, handleCancelForm }) {
  const { setModalIsOpen, addBook, editBook } = useBooksContext();
  const { authors } = useAuthorsContext();

  const CHANGE_TITLE = "change_title";
  const CHANGE_DESCRIPTION = "change_description";
  const CHANGE_SELECTED_AUTHOR = "change_selected_author";

  const formReducer = (state, action) => {
    switch (action.type) {
      case CHANGE_TITLE:
        return {
          title: action.payload,
          description: state.description,
          selectedAuthor: state.selectedAuthor,
        };
      case CHANGE_DESCRIPTION:
        return {
          title: state.title,
          description: action.payload,
          selectedAuthor: state.selectedAuthor,
        };
      case CHANGE_SELECTED_AUTHOR:
        return {
          title: state.title,
          description: state.description,
          selectedAuthor: action.payload,
        };
      default:
        return;
    }
  };

  const [state, dispatch] = useReducer(formReducer, {
    title: book?.title || "",
    description: book?.description || "",
    selectedAuthor: {},
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    book
      ? editBook(
          book,
          state.title,
          state.selectedAuthor.name,
          state.description
        )
      : addBook(
          state.title,
          state.selectedAuthor.id,
          state.selectedAuthor.name,
          state.description
        );
    setIsEdited ? setIsEdited(false) : setModalIsOpen(false);
  };

  return (
    <div className="absolute form bg-white w-1/2 h-1/2 rounded border">
      <form onSubmit={handleFormSubmit}>
        <input
          value={state.title}
          type="text"
          placeholder="Book Title"
          onChange={handleTitleChange}
        />
        <Dropdown
          options={authors}
          selectedAuthor={state.selectedAuthor}
          setSelectedAuthor={setSelectedAuthor}
        />
        <input
          value={state.description}
          type="text"
          placeholder="Book Description"
          onChange={handleDescriptionChange}
        />
        <button>Submit</button>
      </form>
      <button onClick={handleCancelForm} className="m-2">
        Cancel
      </button>
    </div>
  );
}

export default Form;
