using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Quiz.API.Dto;
using Quiz.API.Models;
using Quiz.API.Services;

namespace Quiz.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;
        private IUserService _userService;

        public UserController(ILogger<UserController> logger, IUserService userService)
        {
            _logger = logger;
            _userService = userService;
        }

        [Route("Create")]
        [HttpPost]
        public async Task<ActionResult<User>> Create(UserDto request)
        {
            return Ok(await _userService.Create(request));
        }

        [Route("GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult<User>> GetById(Guid id)
        {
            return Ok(await _userService.GetById(id));
        }
    }
}
