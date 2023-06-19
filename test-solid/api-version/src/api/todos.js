import axios from "axios";

const baseUrl = 'https://64902b191e6aa71680cabcbf.mockapi.io'
const model = 'todos'

const endpoint = `${baseUrl}/${model}`

export const getTodos = async () => {
    const response = await axios.get(`${endpoint}`);
    return response.data;
  };

  export const addTodo = async (todoName) => {
      await axios.post(`${endpoint}`, {todoName})
  }