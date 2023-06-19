export default function ItemRow({ todoName = "", deleteTodo, todoId }) {
  const deleteTask = (todoId) => {
    deleteTodo(todoId);
  };

  return (
    <div className="flex gap-10">
      <p>{todoName}</p>
      <button onClick={() => deleteTask(todoId)}>Delete</button>
    </div>
  );
}
