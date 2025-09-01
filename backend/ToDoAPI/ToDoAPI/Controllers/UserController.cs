using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using ToDoAPI.Services;
using ToDoAPI.ToDoAPI.Core.Entities;
using ToDoAPI.ToDoAPI.Core.Interfaces;

namespace ToDoAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest registerRequest)
        {
            try
            {
                var user = await _userService.RegisterAsync(registerRequest);
                return Ok(new { user.Id, user.Username, user.Email });
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            var authResponse = await _userService.LoginAsync(loginRequest);
            if (authResponse == null)
                return Unauthorized("Invalid username or password.");
            return Ok(authResponse);
        }
    }
}