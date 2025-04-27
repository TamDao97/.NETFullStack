using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Quiz.API.Dto;
using Quiz.API.Models;
using Quiz.API.Services;

namespace Quiz.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionController : ControllerBase
    {

        private readonly ILogger<QuestionController> _logger;
        private IQuestionService _questionService;

        public QuestionController(ILogger<QuestionController> logger, IQuestionService questionService)
        {
            _logger = logger;
            _questionService = questionService;
        }

        [HttpPost]
        public async Task<ActionResult<User>> Create(QuestionDto request)
        {
            return Ok(await _questionService.Create(request));
        }
    }
}
