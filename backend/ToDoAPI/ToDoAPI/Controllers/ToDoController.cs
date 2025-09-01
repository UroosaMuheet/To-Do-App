using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore.Update;
using ToDoAPI.ToDoAPI.Core.Entities;
using ToDoAPI.ToDoAPI.Core.Interfaces;

namespace ToDoAPI.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class ToDoController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IToDoService _toDoService;
        private readonly IUserService _userService;

        public ToDoController(IToDoService toDoService,
                              IUserService userService,
                              IHttpContextAccessor httpContextAccessor)
        {
            _toDoService = toDoService;
            _userService = userService;
            _httpContextAccessor = httpContextAccessor;
        }
        private int GetUserId() =>
            int.Parse(
                _httpContextAccessor.HttpContext!
                .User
                .FindFirst(ClaimTypes.NameIdentifier)!.Value);

        //Get all todos for this user
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var userId = GetUserId();
            var todo = await _toDoService.GetAllByUser(userId);
            return todo == null ? NotFound() : Ok(todo);
        }

        //Get the todo for this user with the given Id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var userId = GetUserId();
            return Ok(await _toDoService.GetById(id, userId));
        }

        //Get the todo for this user with the given status
        [HttpGet("status={status}")]
        public async Task<IActionResult> GetByStatus(String status)
        {
            var userId = GetUserId();
            var todo = await _toDoService.GetByStatus(status, userId);
            return todo == null ? NotFound() : Ok(todo);
        }

        //Get the todo for this user with the given title
        [HttpGet("title={title}")]
        public async Task<IActionResult> GetByTitle(String title)
        {
            var userId = GetUserId();
            var todo = await _toDoService.GetByTitle(title, userId);
            return todo == null ? NotFound() : Ok(todo);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ToDoItem toDoItem)
        {
            //when a resource is created, it should return the status code 201
            //this will also provide the information of where the resource can be found

            var userId = GetUserId();
            toDoItem.UserId = userId;
            //toDoItem.Owner = _userService.GetUser(userId);
            var created = await _toDoService.Create(toDoItem);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ToDoItem toDoItem)
        {
            toDoItem.UserId = GetUserId();
            if (id != toDoItem.Id)
                return BadRequest();
            var updated = await _toDoService.Update(toDoItem);

            //the item did not exist so a new one was created
            if (updated != null &&
                updated.CreatedAt == updated.LastModifiedDate)
                return CreatedAtAction(nameof(GetById), new { id = updated.Id }, updated);
            return updated == null ? BadRequest() : NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _toDoService.Delete(id, GetUserId());
            return deleted ? NoContent() : NotFound();
        }
    }
}