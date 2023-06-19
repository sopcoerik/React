import axios from "axios";

export function useTodoComplete() {
  return (todoId, todoCompleted) => {
    axios.put(`https://64902b191e6aa71680cabcbf.mockapi.io/todos/${todoId}`, {
      completed: todoCompleted,
    });
  };
}
