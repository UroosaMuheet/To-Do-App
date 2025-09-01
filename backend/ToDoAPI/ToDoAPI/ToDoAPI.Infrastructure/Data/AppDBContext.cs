using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDoAPI.ToDoAPI.Core.Entities;

namespace ToDoAPI.ToDoAPI.Infrastructure.Data
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options)
        : base(options) { }

        public DbSet<ToDoItem> Todos { get; set; }
        public DbSet<User> Users { get; set; }
        
    }
}