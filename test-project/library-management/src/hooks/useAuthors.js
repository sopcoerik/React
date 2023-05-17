import { useCallback, useEffect, useReducer } from "react";
import axios from "axios";

export function useAuthors() {
  const LOAD_AUTHORS = "LOAD_AUTHORS";
  const LOAD_AUTHORS_SUCCESS = "LOAD_AUTHORS_SUCCESS";
  const LOAD_AUTHORS_ERROR = "LOAD_AUTHORS_ERROR";

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

  return {
    state,
    setAuthors,
  };
}
