SRP:

I separated the hooks and every item has it's own file, like 'TodoItem', 'TodoList', 'AddTodo', 'useTodoAdd' etc.
Also functions:

const changeTodoCompleted = (todoId) => {
if (todo.completed) {
completeTask(todoId);
} else {
unCompleteTask(todoId);
}
};

-each functionality got it's own function so the main function (the changeTodoCompleted) doesn't have to deal with other logic than to just simply call completeTask or unCompleteTask.

OCP:

I made a wrapper component called 'TodoItemCheck' that has a completeTodo functionality and wraps the already existing TodoItem making it possible to still be able to use the TodoItem alone.

Example:
export default function TodoItemCheck({ todo, deleteTodo, completeTodo }) {
return (

<!-- <div className="flex gap-10">
      <input
        type="checkbox"
        checked={completed}
        onChange={() => changeTodoCompleted(todo.id)}
      />
      <TodoItem todo={todo} deleteTodo={deleteTodo} />
    </div> -->

)
}

LSP:

I made a 'ItemRow' component that is wrapped by the 'TodoItem' component, but they are both the same. This makes it possible to be able to use the TodoItem component instead of the Row component.

Example:
export default function TodoItem({ todo, deleteTodo }) {
return (

<!-- <ItemRow
      todoName={todo?.todoName}
      todoId={todo?.id}
      deleteTodo={deleteTodo}
    /> -->

);
}

ISP:

I made sure every component gets only the props they need/use.

Example:
export default function TodoItemCheck({ todo, deleteTodo, completeTodo })
