using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoAPI.ToDoAPI.Core.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;


        // Navigation property: a User can have many ToDoItems
        public ICollection<ToDoItem> TodoItems { get; set; } = new List<ToDoItem>();
    }
}