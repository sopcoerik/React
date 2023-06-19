import axios from "axios";

import { useEffect, useState } from "react";

export function useTodosFetch() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    const data = await axios.get(
      "https://64902b191e6aa71680cabcbf.mockapi.io/todos"
    );

    setTodos(data.data);
  };

  useEffect(() => {
    getTodos();
  }, []);
  return todos;
}
