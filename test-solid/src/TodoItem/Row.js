export default function Row({ todoName = "", tasks, setTasks, todoId }) {
  const deleteTask = (todoId) => {
    const newTasks = tasks.filter((task) => task.todoName !== todoId);
    setTasks([...newTasks]);
  };

  return (
    <div className="flex gap-10">
      <p>{todoName}</p>
      <button onClick={() => deleteTask(todoId)}>Delete</button>
    </div>
  );
}
