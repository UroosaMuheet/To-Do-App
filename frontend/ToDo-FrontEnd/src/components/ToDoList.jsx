import React from "react";
import ToDoItem from "./ToDoItem";
import UpdateToDoForm from "./UpdateToDoForm";

const ToDoList = ({toDos, onDelete, onUpdate})=>
{
    return(
        (typeof(toDos) === 'undefined') ? 
        <h1> Nothing to display </h1>
        :
        
        (
        <ol className="todo-list">
             
             {toDos.map(toDo=>(
                <React.Fragment key={toDo.Id}>
                    <ToDoItem
                        className="todo-item"
                        toDo={toDo}
                        onDelete={onDelete} />
                    <h3>Update To-Do</h3>
                    <div className="box">
                    <UpdateToDoForm 
                        toDo={toDo}
                        onUpdate={onUpdate} />
                    </div>
                    <hr/>
                </React.Fragment>
             ))}
             
         </ol>)
    );
};
export default ToDoList;
