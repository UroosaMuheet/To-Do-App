using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoAPI.ToDoAPI.Core.Entities;

namespace ToDoAPI.ToDoAPI.Core.Interfaces
{
    public interface IUserService
    {
        Task<User> RegisterAsync(RegisterRequest request);
        Task<AuthResponse?> LoginAsync(LoginRequest request);
        User GetUser(int userId);
    }
}