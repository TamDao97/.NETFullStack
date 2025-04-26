using Microsoft.AspNetCore.Mvc;
using Quiz.API.Dto;
using Quiz.API.Models;
using Quiz.API.Services;

namespace Quiz.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenController : ControllerBase
    {
        private readonly ILogger<AuthenController> _logger;
        private IAuthenService _authenService;

        public AuthenController(ILogger<AuthenController> logger, IAuthenService authenService)
        {
            _logger = logger;
            _authenService = authenService;
        }

        [HttpPost]
        public async Task<ActionResult<User>> LoginAsync(LoginRequestDto reqDto)
        {
            return Ok(await _authenService.LoginAsync(reqDto));
        }
    }
}
