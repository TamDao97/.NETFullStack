using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Quiz.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ILogger<TopicController> _logger;

        public TopicController(ILogger<TopicController> logger)
        {
            _logger = logger;
        }

        //[Route("create")]
        //[HttpGet]
        //public async Task<IActionResult> Create()
        //{

        //}
    }
}
