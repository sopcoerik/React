import axios from "axios";

export function useTodoDelete() {
  return (todoId) => {
    axios.delete(`https://64902b191e6aa71680cabcbf.mockapi.io/todos/${todoId}`);
  };
}
