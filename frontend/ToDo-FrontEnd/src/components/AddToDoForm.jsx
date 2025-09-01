import { useState } from "react";

export default function AddTodoForm({ onAdd }) {
    
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Ready To start");
  const [priority, setPriority] = useState(2);
  
  const constructDate = (dateVal) => {
    return dateVal.getFullYear()+
    "-"+(dateVal.getMonth()< 10 ? "0"+dateVal.getMonth(): dateVal.getMonth())+
    "-"+(dateVal.getDate()<10 ? "0"+dateVal.getDate(): dateVal.getDate()); 
  };
  const [dueDate, setDueDate] = useState(constructDate(new Date()));

  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Title is mandatory
    if (!title.trim()) 
      return;

    onAdd({
      Title: title.trim(),
      Description: description.trim(),
      Status: status,
      DueDate: dueDate,
      Priority: priority
    });

    setTitle("");
    setDescription("");
    setStatus("Ready To start");
    setPriority(2);
    setDueDate(constructDate(new Date()));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4 p-4 border rounded-lg shadow">
    {/* Title */}
      <label>Title: </label>
      <input
        className="border rounded p-2"
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /><br/><br/>
    {/* Description */}
      <label>Description: </label>
      <textarea
        className="border rounded p-2"
        placeholder="Description"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /><br/><br/>

    {/* Status */}
      <label>Status: </label>
      <select
        className="border rounded p-2"
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option defaultValue={status}>Ready To start</option>
        <option>In progress</option>
        <option>Overdue</option>
        <option>Pending</option>
        <option>Done</option>
      </select><br/><br/>
    
    {/* DueDate */}
      <label>Select Due Date:</label>
      <input type="date" id="dueDate" name="dueDate" value={dueDate} onChange={(e)=> setDueDate(e.target.value)}></input><br/><br/>
    
    {/* Priority */}
      <label>Priority: </label>
      <select
        className="border rounded p-2"
        name="priority"
        value={priority}
        onChange={(e) => setPriority(parseInt(e.target.value))}
      >
        <option value="1">High</option>
        <option value="2" defaultValue={priority}>Medium</option>
        <option value="3">Low</option>
      </select><br/><br/>

      <button className="bg-blue-500 text-white rounded px-4 py-2">Add Todo</button>
    </form>
  );
}
