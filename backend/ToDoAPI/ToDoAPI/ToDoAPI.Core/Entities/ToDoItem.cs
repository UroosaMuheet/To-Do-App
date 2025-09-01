using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoAPI.ToDoAPI.Core.Enums;
using System.Text.Json.Serialization;

namespace ToDoAPI.ToDoAPI.Core.Entities
{
    public class ToDoItem
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public String Status { get; set; } = Statuses.readyToStart;
        public String ComputedStatus
        {
            get
            {
                if (Status == Statuses.Done)
                    return Statuses.Done;

                if (DueDate < DateTime.UtcNow)
                    return Statuses.overdue;

                return Status;
            }
        }
        //[JsonIgnore]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? DueDate { get; set; }
        //[JsonIgnore]
        public DateTime? LastModifiedDate { get; set; }

        public PriorityLevel Priority { get; set; } = PriorityLevel.Medium;
        //[JsonIgnore]
        public String? toDoServiceLog { get; set; } = String.Empty;

        // Foreign key + navigation property for User
        //[JsonIgnore]
        public int UserId { get; set; }

        // //[JsonIgnore]
        // public User? Owner { get; set; } // meant to ensure data integrity
        //i.e., to prevent access and manipulation by other users
    }
}