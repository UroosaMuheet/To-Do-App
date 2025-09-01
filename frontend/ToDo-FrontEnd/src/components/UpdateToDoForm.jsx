import { useState } from "react";

export default function UpdateToDoForm({ toDo, onUpdate }) {
    
  const [title, setTitle] = useState(toDo.title);
  const [description, setDescription] = useState(toDo.description);
  const [status, setStatus] = useState(toDo.status);
  const [priority, setPriority] = useState(toDo.priority);
 
  const [dueDate, setDueDate] = useState(toDo.dueDate);
  const handleSubmit = (e) => {
    e.preventDefault();
    
    //Title is mandatory
    if (!title.trim()) 
      return;

    onUpdate(toDo.id,{
      id: toDo.id,
      title: title.trim(),
      description: description.trim(),
      status: status,
      computedStatus: toDo.computedStatus,
      createdAt: toDo.createdAt,
      dueDate: dueDate,
      lastModifiedDate: toDo.lastModifiedDate,
      priority: priority,
      userId: toDo.userId
    });
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
      <label>Select Due Date: </label>
      <input type="date" id="dueDate" name="dueDate" value={dueDate} onChange={(e)=> setDueDate(e.target.value)}></input>
      <br/><br/>
    
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

      <button className="bg-blue-500 text-white rounded px-4 py-2">Update Todo</button>
    </form>
  );
}
