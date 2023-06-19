import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoItem from "../TodoItem/TodoItem";

export default function TodoList() {
  const [addTodoIsOpen, setAddToDoIsOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const renderedTodos = todoList.map((todo) => (
    <TodoItem
      key={todo.todoName}
      todo={todo}
      tasks={todoList}
      setTasks={setTodoList}
    />
  ));

  return (
    <div>
      <div>{renderedTodos}</div>
      <div>
        <AddTodo
          isOpen={addTodoIsOpen}
          setIsOpen={setAddToDoIsOpen}
          tasks={todoList}
          addTask={setTodoList}
        />
        <button onClick={() => setAddToDoIsOpen(true)}>+ Add Task</button>
      </div>
    </div>
  );
}
