import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoItemCheck from "../TodoItem/TodoItemCheck";

import {useTodos} from "../hooks/useTodos";

export default function TodoList() {
  const [addTodoIsOpen, setAddToDoIsOpen] = useState(false);

  // const completeTodo = useTodoComplete();
  // const deleteTodo = useTodoDelete();

  const {todos: todoList, addTodo, getTodos} = useTodos();

  const deleteTodo = fn => fn;
  const completeTodo = fn => fn;

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
