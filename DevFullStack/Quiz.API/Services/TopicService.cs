using Microsoft.EntityFrameworkCore;
using Quiz.API.Common;
using Quiz.API.Data;
using Quiz.API.Dto;
using Quiz.API.Models;

namespace Quiz.API.Services
{
    public interface ITopicService
    {
        Task<Response<List<DropdownBase>>> GetSelectTopic();
    }

    public class TopicService : ITopicService
    {
        private QuizDbContext _dbContext;

        public TopicService(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response<List<DropdownBase>>> GetSelectTopic()
        {
            var datas = _dbContext.Topics.AsNoTracking().Select(r => new DropdownBase { Id = r.Id, Text = r.Name }).ToList();
            return Response<List<DropdownBase>>.Success(datas, "Thành công!");
        }
    }
}
