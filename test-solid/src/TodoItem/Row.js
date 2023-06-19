import { useState } from "react";

export default function Row({ todoName = "", tasks, setTasks, todoId }) {
  const [completed, setCompleted] = useState(false);

  const deleteTask = (todoId) => {
    const newTasks = tasks.filter((task) => task.todoName !== todoId);
    setTasks([...newTasks]);
  };

  const completeTask = (todoId) => {
    setCompleted(true);
    const foundCompletedTask = tasks.find((task) => task.todoName === todoId);
    const completedTask = {
      ...foundCompletedTask,
      completed: true,
    };
    const newTasks = tasks.filter(
      (task) => task.todoName !== foundCompletedTask.todoName
    );
    setTasks([...newTasks, completedTask]);
  };

  const unCompleteTask = (todoId) => {
    setCompleted(false);
    const foundTask = tasks.find((task) => task.todoName === todoId);
    const unCompletedTask = {
      ...foundTask,
      completed: false,
    };
    const newTasks = tasks.filter(
      (task) => task.todoName !== foundTask.todoName
    );
    setTasks([...newTasks, unCompletedTask]);
  };

  const changeTodoCompleted = (todoId) => {
    if (!completed) {
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
        onChange={() => changeTodoCompleted(todoId)}
      />
      <p>{todoName}</p>
      <button onClick={() => deleteTask(todoId)}>Delete</button>
    </div>
  );
}
