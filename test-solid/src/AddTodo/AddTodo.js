import { useState } from "react";

export default function AddTodo({
  isOpen = false,
  setIsOpen,
  tasks = [],
  addTask,
}) {
  const [inputValue, setInputValue] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    addTask([
      ...tasks,
      {
        todoName: inputValue,
        completed: false,
      },
    ]);
    setIsOpen(false);
    setInputValue("");
  };

  if (!isOpen) return null;

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
      </form>
    </div>
  );
}
