using Microsoft.AspNetCore.Mvc;
using Quiz.API.Services;

namespace Quiz.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly ILogger<CommonController> _logger;
        private ICommonService _commonService;

        public CommonController(ILogger<CommonController> logger, ICommonService commonService)
        {
            _logger = logger;
            _commonService = commonService;
        }

        [Route("GetListQuestionType")]
        [HttpGet]
        public async Task<ActionResult<object>> GetListQuestionType()
        {
            return Ok(await _commonService.GetListQuestionType());
        }

        [Route("GetListQuestionLevel")]
        [HttpGet]
        public async Task<ActionResult<object>> GetListQuestionLevel()
        {
            return Ok(await _commonService.GetListQuestionLevel());
        }

        [Route("GetListTopic")]
        [HttpGet]
        public async Task<ActionResult<object>> GetListTopic()
        {
            return Ok(await _commonService.GetListTopic());
        }
    }
}
