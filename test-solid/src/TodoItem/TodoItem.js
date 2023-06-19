import Row from "./Row";

export default function TodoItem({ todo, tasks = [], setTasks }) {
  return (
    <Row
      todoName={todo.todoName}
      tasks={tasks}
      setTasks={setTasks}
      todoId={todo.todoName}
    />
  );
}
