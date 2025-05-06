using Quiz.API.Common;
using Quiz.API.Data;

namespace Quiz.API.Services
{
    public interface ICommonService
    {
        Task<Response<List<DropdownBase<int>>>> GetListQuestionType();
        Task<Response<List<DropdownBase<int>>>> GetListQuestionLevel();
        Task<Response<List<DropdownBase<Guid>>>> GetListTopic();
    }

    public class CommonService : ICommonService
    {
        private QuizDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public CommonService(QuizDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<Response<List<DropdownBase<int>>>> GetListQuestionType()
        {
            var datas = Enum.GetValues(typeof(EnumQuestionType))
                            .Cast<EnumQuestionType>()
                            .Select(r => new DropdownBase<int>
                            {
                                Id = (int)r,
                                Text = r.ToDescription()
                            })
                            .ToList();
            return Response<List<DropdownBase<int>>>.Success(datas, "Thành công!");
        }

        public async Task<Response<List<DropdownBase<int>>>> GetListQuestionLevel()
        {
            var datas = Enum.GetValues(typeof(EnumQuestionLevel))
                           .Cast<EnumQuestionType>()
                           .Select(r => new DropdownBase<int>
                           {
                               Id = (int)r,
                               Text = r.ToDescription()
                           })
                           .ToList();
            return Response<List<DropdownBase<int>>>.Success(datas, "Thành công!");
        }

        public async Task<Response<List<DropdownBase<Guid>>>> GetListTopic()
        {
            var datas = _dbContext.Topics.Select(r => new DropdownBase<Guid>
            {
                Id = r.Id,
                Text = $"{r.Name} ({r.Code})"
            }).ToList();
            return Response<List<DropdownBase<Guid>>>.Success(datas, "Thành công!");
        }
    }
}
