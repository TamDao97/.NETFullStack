using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Common;
using Quiz.API.Dto;
using Quiz.API.Models;
using Quiz.API.Services;

namespace Quiz.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [Route("Search")]
        [HttpPost]
        public async Task<ActionResult<Response<List<UserDto>>>> Search(UserGridRequestDto request)
        {
            return Ok(await _userService.Search(request));
        }

        [Route("Create")]
        [HttpPost]
        public async Task<ActionResult<User>> Create(UserDto request)
        {
            return Ok(await _userService.Create(request));
        }

        [Route("Update")]
        [HttpPost]
        public async Task<ActionResult<User>> Update(UserDto request)
        {
            return Ok(await _userService.Update(request));
        }

        [Route("Delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult<User>> Delete(Guid id)
        {
            return Ok(await _userService.Delete(id));
        }

        [Route("GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult<Response<UserDto>>> GetById(Guid id)
        {
            return Ok(await _userService.GetById(id));
        }
    }
}
