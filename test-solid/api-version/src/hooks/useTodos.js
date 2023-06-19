// add todos functionality here
import { useEffect, useState } from "react";
import { getTodos as apiGetTodos, addTodo as apiAddTodo } from "../api/todos";

export const useTodos = () => {
    const [todos, setTodos] = useState([]);

    const getTodos = async () => {
        const todos = await apiGetTodos();
        setTodos(todos);
    };

    const addTodo = async (todoName) => {
        await apiAddTodo(todoName);
        getTodos();
    }

    useEffect(() => {
        getTodos();
    }, []);

    return { todos, getTodos, addTodo };

    //todo: completeTodo, deleteTodo

}