import ItemRow from "./ItemRow";

export default function TodoItem({ todo, deleteTodo }) {
  return (
    <ItemRow
      todoName={todo?.todoName}
      todoId={todo?.id}
      deleteTodo={deleteTodo}
    />
  );
}
