import { useCallback, useEffect, useReducer } from "react";
import axios from "axios";

export function useAuthors() {
  const LOAD_AUTHORS = "LOAD_AUTHORS";
  const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
  const LOAD_AUTHORS_ERROR = "LOAD_AUTHORS_ERROR";
  const ADD_AUTHOR_SUCCESS = "ADD_AUTHOR_SUCCESS";
  const ADD_AUTHOR_ERROR = "ADD_AUTHOR_ERROR";
  const UPDATE_AUTHOR_SUCCESS = "UPDATA_AUTHOR_SUCCESS";
  const UPDATE_AUTHOR_ERROR = "UPDATE_AUTHOR_ERROR";
  const DELETE_AUTHOR_SUCCESS = "DELETE_AUTHOR_SUCCESS";
  const DELETE_AUTHOR_ERROR = "DELETE_AUTHOR_ERROR";
  const SORT_AUTHORS = "SORT_AUTHORS";

  const authorsReducer = (state, action) => {
    switch (action.type) {
      case LOAD_AUTHORS:
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case LOAD_AUTHORS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          error: null,
          data: action.payload,
        };
      case LOAD_AUTHORS_ERROR:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case ADD_AUTHOR_SUCCESS:
        return {
          ...state,
          error: null,
          data: action.payload,
        };
      case ADD_AUTHOR_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case UPDATE_AUTHOR_SUCCESS:
        return {
          ...state,
          error: null,
          data: action.payload,
        };
      case UPDATE_AUTHOR_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case DELETE_AUTHOR_SUCCESS:
        return {
          ...state,
          error: null,
          data: action.payload,
        };
      case DELETE_AUTHOR_ERROR:
        return {
          ...state,
          error: action.payload,
        };
      case SORT_AUTHORS:
        return {
          ...state,
          error: null,
          data: action.payload,
        };
      default:
        return;
    }
  };

  const setAuthors = (data) => {
    dispatch({
      type: LOAD_AUTHORS_SUCCESS,
      payload: data,
    });
  };

  const setAuthorsLoading = () => {
    dispatch({
      type: LOAD_AUTHORS,
    });
  };

  const setAuthorsError = (err) => {
    dispatch({
      type: LOAD_AUTHORS_ERROR,
      payload: err,
    });
  };

  const sortAuthors = (authors) => {
    dispatch({
      type: SORT_AUTHORS,
      payload: authors,
    });
  };

  const reloadAuthors = () => {
    fetchAuthors();
  };

  const [state, dispatch] = useReducer(authorsReducer, {
    isLoading: false,
    data: [],
    error: null,
  });

  const fetchAuthors = useCallback(async () => {
    try {
      setAuthorsLoading();
      const response = await axios.get(
        "https://645e200d12e0a87ac0e837cd.mockapi.io/authors"
      );

      setAuthors(response.data);
    } catch (err) {
      setAuthorsError(err);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const addAuthor = async (name) => {
    try {
      const response = await axios.post(
        "https://645e200d12e0a87ac0e837cd.mockapi.io/authors",
        {
          name,
        }
      );

      dispatch({
        type: ADD_AUTHOR_SUCCESS,
        payload: [...state.data, response.data],
      });
    } catch (err) {
      dispatch({
        type: ADD_AUTHOR_ERROR,
        payload: err,
      });
    }
  };

  const editAuthor = async (author, name) => {
    try {
      const response = await axios.put(
        `https://645e200d12e0a87ac0e837cd.mockapi.io/authors/${author.id}`,
        {
          name,
        }
      );

      const authorToReplace = state.data.find(
        (currentAuthor) => currentAuthor.id === author.id
      );
      const index = state.data.indexOf(authorToReplace);
      const updatedAuthors = state.data.map((currentAuthor, i) =>
        i === index ? response.data : currentAuthor
      );

      dispatch({
        type: UPDATE_AUTHOR_SUCCESS,
        payload: updatedAuthors,
      });
    } catch (err) {
      dispatch({
        type: UPDATE_AUTHOR_ERROR,
        payload: err,
      });
    }
  };

  const deleteAuthor = async (author) => {
    try {
      await axios.delete(
        `https://645e200d12e0a87ac0e837cd.mockapi.io/authors/${author.id}`
      );

      const updatedAuthors = state.data.filter(
        (currentAuthor) => currentAuthor.id !== author.id
      );

      dispatch({
        type: DELETE_AUTHOR_SUCCESS,
        payload: updatedAuthors,
      });
    } catch (err) {
      dispatch({
        type: DELETE_AUTHOR_ERROR,
        payload: err,
      });
    }
  };

  return {
    state,
    setAuthors,
    sortAuthors,
    addAuthor,
    editAuthor,
    deleteAuthor,
    reloadAuthors,
  };
}
