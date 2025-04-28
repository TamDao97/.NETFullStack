using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Common;
using Quiz.API.Models;
using Quiz.API.Services;

namespace Quiz.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TopicController : ControllerBase
    {
        private readonly ILogger<TopicController> _logger;
        private readonly ITopicService _topicService;

        public TopicController(ILogger<TopicController> logger, ITopicService topicService)
        {
            _logger = logger;
            _topicService = topicService;
        }

        [Route("GetSelectTopic")]
        [HttpGet]
        public async Task<ActionResult<List<DropdownBase>>> GetSelectTopic()
        {
            return Ok(await _topicService.GetSelectTopic());
        }
    }
}
