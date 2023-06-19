import { useState } from "react";

import TodoItem from "./TodoItem";

export default function TodoItemCheck({ todo, deleteTodo, completeTodo }) {
  const [completed, setCompleted] = useState(false);

  const changeTodoState = todoId => {
    const newState = !todo.completed;
    setCompleted(newState)
    completeTodo(todoId, newState)
  }

  return (
    <div className="flex gap-10">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => changeTodoState(todo.id)}
      />
      <TodoItem todo={todo} deleteTodo={deleteTodo} />
    </div>
  );
}
