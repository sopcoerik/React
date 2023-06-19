import axios from "axios";

export function useTodoAdd() {
  return (todoName) =>
    axios.post("https://64902b191e6aa71680cabcbf.mockapi.io/todos", {
      todoName,
    });
}
