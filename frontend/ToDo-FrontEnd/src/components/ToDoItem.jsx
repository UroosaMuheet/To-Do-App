
export default function ToDoItem({toDo, onDelete})
{
    const getStatusStyle = (toDoStatus)=>{
        console.log(`from getStatusStyle : ${JSON.stringify(toDo)}`);
        switch(toDoStatus.toLowerCase().trim())
        {
            case "done":
                return "line-through-gray";
            case "in progress":
                return "text-blue-600";
            case "overdue":
                return "text-red-600";
            case "pending":
                return "text-yellow-600";
            case "ready to start":
            default:
                return "text-green-600";
            
        }
    };
    const getPriorityString = (p) =>{
        switch(p)
        {
            case 1: 
                return "High";
            case 2:
                return "Medium";
            case 3:
                return "Low"
        }

    };
    const formattedDate = (date) => {
      var dateObj = new Date(date);
      return dateObj.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",  // "Aug"
        day: "2-digit"
    })};

// Format time (local zone)
    const formattedTime = (date) => {
      var dateObj = new Date(date);
      return dateObj.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true
        })};
    return (
    <li className="flex justify-between p-2 border-b items-center">
      <h3 className={`${(toDo.computedStatus == "Overdue" && toDo.status !== "Done")? getStatusStyle(toDo.computedStatus):getStatusStyle(toDo.status)}`}>
        Title: {toDo.title}
      </h3>
        <p className="ml-4 border rounded p-1">
          Status: {toDo.computedStatus == "Overdue" && toDo.status !== "Done" ? toDo.computedStatus : toDo.status}
        </p>
        
        <p className="text-gray-700">Created at: {formattedDate(toDo.createdAt)} &nbsp; {formattedTime(toDo.createdAt)}</p>
        <p className="text-gray-700">Last Modified at: {formattedDate(toDo.lastModifiedDate)} &nbsp; {formattedTime(toDo.lastModifiedDate)}</p>
        <p className="text-gray-700">Description: {toDo.description ? toDo.description : "" }</p>
        <p className="text-gray-700">Priority : {getPriorityString(toDo.priority)}</p>
        <p className="text-gray-700">Due Date: {toDo.dueDate ? formattedDate(toDo.dueDate) : "" }</p>

        <button
          className="delete"
          onClick={() => onDelete(toDo.id)}>
          Delete
        </button>
    </li>
  );
}
