using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoAPI.ToDoAPI.Core.Entities;

namespace ToDoAPI.ToDoAPI.Core.Interfaces
{
    public interface IToDoService
    {
        void SetToDoServiceLog(String message, int userId);
        Task<IEnumerable<ToDoItem>> GetAllByUser(int userId);
        Task<ToDoItem?> GetById(int id, int userId);
        Task<IEnumerable<ToDoItem>?> GetByTitle(String title, int userId);
        Task<IEnumerable<ToDoItem?>> GetByStatus(String status, int userId);
        Task<ToDoItem> Create(ToDoItem item);
        Task<ToDoItem?> Update(ToDoItem item);
        Task<bool> Delete(int id, int userId);
    }
}