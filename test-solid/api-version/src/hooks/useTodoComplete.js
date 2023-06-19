import axios from "axios";

export function useTodoComplete() {
  return (todoId, trueOrFalse) => {
    axios.put(`https://64902b191e6aa71680cabcbf.mockapi.io/todos/${todoId}`, {
      completed: trueOrFalse,
    });
  };
}
