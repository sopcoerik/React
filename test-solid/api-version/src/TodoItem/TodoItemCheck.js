import { useState } from "react";

import TodoItem from "./TodoItem";

export default function TodoItemCheck({ todo, deleteTodo, completeTodo }) {
  const [completed, setCompleted] = useState(false);

  const completeTask = (todoId) => {
    setCompleted(true);

    completeTodo(todoId, true);
  };

  const unCompleteTask = (todoId) => {
    setCompleted(false);

    completeTodo(todoId, false);
  };

  const changeTodoCompleted = (todoId) => {
    if (todo.completed) {
      completeTask(todoId);
    } else {
      unCompleteTask(todoId);
    }
  };

  return (
    <div className="flex gap-10">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => changeTodoCompleted(todo.id)}
      />
      <TodoItem todo={todo} deleteTodo={deleteTodo} />
    </div>
  );
}
