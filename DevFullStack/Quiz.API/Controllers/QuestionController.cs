using Microsoft.AspNetCore.Mvc;
using Quiz.API.Common;
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

        [Route("get-by-id")]
        [HttpPost]
        public async Task<ActionResult<Response<QuestionDetailResponseDto>>> GetById(Guid id)
        {
            return Ok(await _questionService.GetById(id));
        }

        [Route("search")]
        [HttpPost]
        public async Task<ActionResult<Response<List<QuestionGridResponseDto>>>> Search(QuestionGridFilterRequestDto request)
        {
            return Ok(await _questionService.Search(request));
        }

        [Route("create")]
        [HttpPost]
        public async Task<ActionResult<bool>> Create(QuestionCreateRequestDto request)
        {
            return Ok(await _questionService.Create(request));
        }

        [Route("update")]
        [HttpPost]
        public async Task<ActionResult<bool>> Update(QuestionCreateRequestDto request)
        {
            return Ok(await _questionService.Update(request));
        }
    }
}
