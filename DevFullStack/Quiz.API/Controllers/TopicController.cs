using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Common;
using Quiz.API.Dto;
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

        /*[Route("GetSelectTopic")]
        [HttpGet]
        public async Task<ActionResult<List<DropdownBase>>> GetSelectTopic()
        {
            return Ok(await _topicService.GetSelectTopic());
        }
        */
        [Route("Search")]
        [HttpPost]
        public async Task<ActionResult<Response<List<TopicDto>>>> Search(TopicGridRequestDto request)
        {
            return Ok(await _topicService.Search(request));
        }

        [Route("Create")]
        [HttpPost]
        public async Task<ActionResult<User>> Create(TopicDto request)
        {
            return Ok(await _topicService.Create(request));
        }

        [Route("Update")]
        [HttpPost]
        public async Task<ActionResult<User>> Update(TopicDto request)
        {
            return Ok(await _topicService.Update(request));
        }

        [Route("Delete/{id}")]
        [HttpDelete]
        public async Task<ActionResult<User>> Delete(Guid id)
        {
            return Ok(await _topicService.Delete(id));
        }

        [Route("GetById/{id}")]
        [HttpGet]
        public async Task<ActionResult<Response<TopicDto>>> GetById(Guid id)
        {
            return Ok(await _topicService.GetById(id));
        }

    }
}