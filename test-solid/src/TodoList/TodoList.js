import { useState } from "react";
import AddTodo from "../AddTodo/AddTodo";
import TodoItemCheck from "../TodoItem/TodoItemCheck";

export default function TodoList() {
  const [addTodoIsOpen, setAddToDoIsOpen] = useState(false);
  const [todoList, setTodoList] = useState([]);

  const renderedTodos = todoList.map((todo) => (
    <TodoItemCheck
      key={todo.todoName}
      todo={todo}
      tasks={todoList}
      setTasks={setTodoList}
    />
  ));
  console.log(todoList);
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
