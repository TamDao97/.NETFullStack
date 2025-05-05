using Quiz.API.Data;

namespace Quiz.API.Services
{
    public interface ITopicService
    {
    }

    public class TopicService : ITopicService
    {
        private QuizDbContext _dbContext;

        public TopicService(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }
    }
}
