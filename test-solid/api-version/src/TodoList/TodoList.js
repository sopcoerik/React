import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoItemCheck from "../TodoItem/TodoItemCheck";

import { useTodosFetch } from "../hooks/useTodosFetch";
import { useTodoAdd } from "../hooks/useTodoAdd";
import { useTodoDelete } from "../hooks/useTodoDelete";
import { useTodoComplete } from "../hooks/useTodoComplete";

export default function TodoList() {
  const [addTodoIsOpen, setAddToDoIsOpen] = useState(false);

  const deleteTodo = useTodoDelete();

  const addTodo = useTodoAdd();

  const todoList = useTodosFetch();

  const completeTodo = useTodoComplete();

  const renderedTodos = todoList?.map((todo) => (
    <TodoItemCheck
      key={todo?.todoName}
      todo={todo}
      deleteTodo={deleteTodo}
      completeTodo={completeTodo}
    />
  ));

  return (
    <div>
      <div>{renderedTodos}</div>
      <div>
        <AddTodo
          isOpen={addTodoIsOpen}
          setIsOpen={setAddToDoIsOpen}
          addTodo={addTodo}
        />
        <button onClick={() => setAddToDoIsOpen(true)}>+ Add Task</button>
      </div>
    </div>
  );
}
