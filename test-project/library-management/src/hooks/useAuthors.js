import { useCallback, useEffect, useReducer } from "react";
import axios from "axios";

export function useAuthors() {
  const IS_LOADING = "is_loading";
  const SET_DATA = "set_data";
  const SET_ERROR = "set_error";

  const authorsReducer = (state, action) => {
    switch (action.type) {
      case IS_LOADING:
        return {
          isLoading: action.payload,
          data: state.data,
          error: state.error,
        };
      case SET_DATA:
        return {
          isLoading: false,
          data: action.payload,
          error: state.error,
        };
      case SET_ERROR:
        return {
          isLoading: false,
          data: state.data,
          error: action.payload,
        };
      default:
        return;
    }
  };

  const setData = (data) => {
    dispatch({
      type: SET_DATA,
      payload: data,
    });
  };

  const setIsLoading = (boolean) => {
    dispatch({
      type: IS_LOADING,
      payload: boolean,
    });
  };

  const setError = (err) => {
    dispatch({
      type: SET_ERROR,
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
      setIsLoading(true);
      const response = await axios.get(
        "https://645e200d12e0a87ac0e837cd.mockapi.io/authors"
      );

      setData(response.data);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  return {
    state,
    setData,
  };
}
