/**
 * REMINDER TO SELF
 * Call update endpoint with not just status update, but everything that can be updated
 */

import { useEffect, useState } from "react";
import api from "../api/api";
import ToDoList from "../components/ToDoList";
import AddTodoForm from "../components/AddToDoForm";
import UpdateToDoForm from "../components/UpdateToDoForm";
import { useAuth } from "../context/useAuth";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const { logout } = useAuth();

  //Get all ToDos once at page load - useEffect with empty brackets
  useEffect(() => {
    console.log(`Token in GET: ${localStorage.getItem('token')}`);
    api.get("/ToDo").then((res) => {
      console.log(res.data[0].id);
      setTodos([...res.data])});
  }, []);

  //Add a new ToDo
  const addTodo = async (todo) => {
    //The todo object contains the following:
    /*
    1. Title: title.trim(),
    2. Description: description.trim(),
    3. Status: status,
    4. DueDate: dueDate,
    5. Priority: priority
     */
    //var payload = JSON.stringify(todo);
    const res = await api.post("/ToDo", todo);
    console.log(`Added ToDo:${JSON.stringify(res.data)}`);
    setTodos([...todos, res.data]);
  };

  const updateTodo = async (id, todo)=>{
    console.log(`Id: ${id} --- ToDo: ${JSON.stringify(todo)}`)
    await api.put(`/ToDo/${id}`, todo);
    console.log(`Updated ToDos: ${todos.map((t) => (t.id == id ? JSON.stringify(todo) : JSON.stringify(t)))}`);
    setTodos(todos.map((t) => (t.id == id ? todo : t)));
  };

  
  const deleteTodo = async (id) => {
    await api.delete(`/ToDo/${id}`);
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <div className="box">
      <h2 >Create a new To-Do</h2>
      <AddTodoForm onAdd={addTodo} />
      </div>

      <h2>My To-Do list</h2>
      <ToDoList 
        toDos={todos} 
        onDelete={deleteTodo}
        onUpdate={updateTodo} />
      <button className="mt-4 text-red-500" onClick={logout}>
        Logout
      </button>
    </div>
  );
}
