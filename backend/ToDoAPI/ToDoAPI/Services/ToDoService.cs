using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoAPI.ToDoAPI.Core.Entities;
using ToDoAPI.ToDoAPI.Core.Interfaces;
using ToDoAPI.ToDoAPI.Infrastructure.Data;

namespace ToDoAPI.Services
{
    public class ToDoService : IToDoService
    {
        private AppDBContext _appDBContext;
        public ToDoService(AppDBContext appDBContext)
        {
            _appDBContext = appDBContext;
        }
        public async Task<IEnumerable<ToDoItem>> GetAllByUser(int userId)
        {
            return await _appDBContext.Todos
                            .Where(toDo => toDo.UserId == userId)
                            .ToListAsync();
        }

        public async Task<ToDoItem?> GetById(int id, int userId)
        {
            return await _appDBContext.Todos
                            .FirstOrDefaultAsync(toDo => toDo.UserId == userId && toDo.Id == id);
        }

        public async Task<IEnumerable<ToDoItem?>> GetByStatus(string status, int userId)
        {
            return await _appDBContext.Todos
                            .Where(toDo => toDo.UserId == userId && toDo.Status.ToLower().Contains(status.ToLower()))
                            .ToListAsync();
        }

        public async Task<IEnumerable<ToDoItem>?> GetByTitle(string title, int userId)
        {
            return await _appDBContext.Todos
                            .Where(toDo => toDo.UserId == userId &&
                                            toDo.Title.ToLower().Contains(title.ToLower()))
                            .ToListAsync();
        }
        public async Task<ToDoItem> Create(ToDoItem item)
        {
            item.LastModifiedDate = DateTime.UtcNow;
            _appDBContext.Todos.Add(item);
            await _appDBContext.SaveChangesAsync();
            return item;
        }

        public async Task<bool> Delete(int id, int userId)
        {
            //Finding the record to delete and saving in a variable
            var item = await _appDBContext.Todos.FirstOrDefaultAsync(toDo => toDo.UserId == userId && toDo.Id == id);

            //if the item was not present, no action is performed and FALSE is returned
            if (item == null)
                return false;

            //if the item was found, it is deleted 
            _appDBContext.Todos.Remove(item);

            //A response is returned after the deletion has been committed to DB - depending on whether or not it was successful
            return await _appDBContext.SaveChangesAsync() > 0;
        }

        public async Task<ToDoItem?> Update(ToDoItem item)
        {
            int userId = item.UserId;
            int Id = item.Id;
            var toDo = _appDBContext.Todos.FirstOrDefault(todo => todo.UserId == userId && todo.Id == Id);
            ToDoItem finalToDo;

            //if the toDo does not exist in DB, then add it as a new toDo
            if (toDo == null)
            {
                //item.toDoServiceLog += DateTime.UtcNow.ToLongDateString()+" : ToDoItem does not exist to update. Creating new ToDoItem instead - " + item.Owner.Username;
                var timeNow = DateTime.UtcNow;
                item.CreatedAt = timeNow;
                item.LastModifiedDate = timeNow;
                finalToDo = item;
                _appDBContext.Todos.Add(item);
            }

            //update what is required -> control what fields you do not want to update e.g., CreateDate
            else
            {
                if (toDo.Description != item.Description)
                    toDo.Description = item.Description;
                if (toDo.DueDate != item.DueDate)
                    toDo.DueDate = item.DueDate;
                // if (item.Owner == null)
                //     toDo.Owner = null;
                // else if (toDo.Owner != null && toDo.Owner.Username != item.Owner.Username)
                //     toDo.Owner = item.Owner;
                if (toDo.Priority != item.Priority)
                    toDo.Priority = item.Priority;
                if (toDo.Status != item.Status)
                    toDo.Status = item.Status;
                if (toDo.Title != item.Title)
                    toDo.Title = item.Title;

                toDo.LastModifiedDate = DateTime.UtcNow;
                finalToDo = toDo;
                _appDBContext.Todos.Update(toDo);

            }
            var updated = await _appDBContext.SaveChangesAsync() ;
            return updated > 0 ? finalToDo : null;
        }

        public void SetToDoServiceLog(String message, int userId)
        {
            _appDBContext.Todos
                .FirstOrDefault(toDo => toDo.UserId == userId)
                .toDoServiceLog.Concat(message + "\n");
            _appDBContext.SaveChanges();
        }

    }
}