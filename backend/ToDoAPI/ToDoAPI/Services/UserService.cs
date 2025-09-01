using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoAPI.ToDoAPI.Core.Entities;
using ToDoAPI.ToDoAPI.Core.Interfaces;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BCrypt.Net;
using ToDoAPI.ToDoAPI.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ToDoAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _iConfig;
        private readonly AppDBContext _appDBContext;

        public UserService(IConfiguration iConfig, AppDBContext appDBContext)
        {
            _iConfig = iConfig;
            _appDBContext = appDBContext;
        }
        public async Task<AuthResponse?> LoginAsync(LoginRequest request)
        {
            /*
            Check if the user credentials are valid => username password match
            Using SingleOrDefault since we expect at most one 
            match for the username 
            since we made sure of that during registration
            */
            var existing = await _appDBContext.Users.SingleOrDefaultAsync(user => user.Username == request.Username);

            //No Match => return nothing
            if (existing == null ||
            !BCrypt.Net.BCrypt.Verify(request.Password, existing.PasswordHash))
                return null;
            //Match Found => Generate JWT Token

            //Step1: Create claims i.e., user information
            //to uniquely identify them
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier, existing.Id.ToString()),
                new Claim(ClaimTypes.Name, existing.Username),
                new Claim(ClaimTypes.Email, existing.Email)
            };

            //Step2: Create Symmetric key for login and validation
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_iConfig["Jwt:Key"]!));

            //Step3: Create sigining credentials
            //using key and hashing to prevent tampering
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //Step4: Generating token
            //combining claims, creds and few other details
            var token = new JwtSecurityToken(
                issuer: _iConfig["Jwt:Issuer"],
                audience: _iConfig["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            //Return the token in response
            return new AuthResponse
            {
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                user = new User {Id=existing.Id, Email=existing.Email, Username=existing.Username }
            };
        }

        public async Task<User> RegisterAsync(RegisterRequest request)
        {
            var existing = _appDBContext.Users.Any(user => user.Username == request.Username || user.Email == request.Email);
            if (existing)
            {
                throw new Exception("Username or Email already exists");
            }
            var newUser = new User
            {
                Username = request.Username,
                Email = request.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
            };

            _appDBContext.Users.Add(newUser);
            await _appDBContext.SaveChangesAsync();
            return newUser;
        }

        public User GetUser(int userId)
        {
            return _appDBContext.Users.FirstOrDefault(user => user.Id == userId)!;
        }
    }
}