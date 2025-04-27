using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Quiz.API.Common;
using Quiz.API.Data;
using Quiz.API.Dto;
using Quiz.API.Models;
using System.Text.RegularExpressions;

namespace Quiz.API.Services
{
    public interface IQuestionService
    {
        Task<Response<Question>> Create(QuestionDto request);
        Task<Question> Update(QuestionDto request);
        Task<Question> Delete(Guid id);
        Task<Question> GetById(Guid id);
        Task<Question> GetByFilter(string name);
    }
    public class QuestionService: IQuestionService
    {
        private QuizDbContext _dbContext;

        public QuestionService(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response<Question>> Create(QuestionDto request)
        {
            var question = new Question
            {
                Id = Guid.NewGuid(),
                Code = request.Code,
                Name = request.Name,
                Content = request.Content,
                Description = request.Description,

            };

            _dbContext.Questions.Add(question);
            _dbContext.SaveChanges();
            return Response<Question>.Success(question, "Thành công!");
        }

        public Task<Question> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Question> GetByFilter(string name)
        {
            throw new NotImplementedException();
        }

        public Task<Question> GetById(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Question> Update(QuestionDto request)
        {
            throw new NotImplementedException();
        }
    }
}
