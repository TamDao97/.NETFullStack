using Microsoft.EntityFrameworkCore;
using Quiz.API.Common;
using Quiz.API.Data;
using Quiz.API.Dto;
using Quiz.API.Models;

namespace Quiz.API.Services
{
    public interface ITopicService
    {
        //Task<Response<List<DropdownBase>>> GetSelectTopic();
        Task<Response<Topic>> Create(TopicDto request);
        Task<Response<bool>> Delete(Guid id);
        Task<Response<Topic>> Update(TopicDto request);
        Task<Response<TopicDto>> GetById(Guid id);
        Task<Response<GridResponse<TopicDto>>> Search(TopicGridRequestDto request);
    }

    public class TopicService : ITopicService
    {
        private QuizDbContext _dbContext;

        public TopicService(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response<Topic>> Create(TopicDto request)
        {
            if (_dbContext.Topics.Any(r => r.TopicName == request.TopicName))
            {
                return Response<Topic>.Error(StatusCode.InternalServerError, "Chủ đề đã tồn tại trên hệ thống!");
            }
            string code;
            do
            {
                code = Utils.GenCodeUnique("TP");
            } while (_dbContext.Users.AsNoTracking().Any(r => r.Code == code));

            var topic = new Topic
            {
                Id = Guid.NewGuid(),
                Code = code,
                TopicName = request.TopicName,
                Description = request.Description,
                DateCreated = DateTime.Now,
                DateModify = DateTime.Now
            };

            _dbContext.Topics.Add(topic);
            _dbContext.SaveChanges();
            return Response<Topic>.Success(topic, "Thành công!");
        }

        public async Task<Response<bool>> Delete(Guid id)
        {
            var topic = _dbContext.Topics.FirstOrDefault(r => r.Id == id);

            if (topic == null) return Response<bool>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());

            _dbContext.Topics.Remove(topic);
            _dbContext.SaveChanges();
            return Response<bool>.Success(true, StatusCode.Ok.ToDescription());
        }
        public async Task<Response<GridResponse<TopicDto>>> Search(TopicGridRequestDto request)
        {
            var query = _dbContext.Topics.AsNoTracking();

            if (!string.IsNullOrEmpty(request.KeyWord))
            {
                query = query.Where(r => r.TopicName.ToUpper().Contains(request.KeyWord.Trim().ToUpper())
                                    || r.Code.ToUpper().Contains(request.KeyWord.Trim().ToUpper()));
            }

            var totalRecord = query.Select(r => r.Id).Count();
            var datas = query.OrderByDescending(r => r.DateModify).Skip((request.Page - 1) * request.PageSize)
                            .Take(request.PageSize)
                            .Select(r => new TopicDto
                            {
                                Id = r.Id,
                                Code = r.Code,
                                TopicName = r.TopicName,
                                Description = r.Description,

                            }).ToList();
            return Response<GridResponse<TopicDto>>.Success(new GridResponse<TopicDto>
            {
                TotalRecord = totalRecord,
                Datas = datas
            }, "Thành công!");
        }

        public async Task<Response<TopicDto>> GetById(Guid id)
        {
            var topicRes = _dbContext.Topics.Select(r => new TopicDto
            {
                Id = r.Id,
                TopicName = r.TopicName,
                Description = r.Description,

            }).FirstOrDefault(r => r.Id == id);

            if (topicRes == null) return Response<TopicDto>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());
            return Response<TopicDto>.Success(topicRes, "Thành công!");
        }

        /*public async Task<Response<List<DropdownBase>>> GetSelectTopic()
        {
            var datas = await _dbContext.Topics
                .AsNoTracking()
                .Select(r => new DropdownBase { Id = r.Id, Text = r.TopicName }) 
                .ToListAsync();

            return Response<List<DropdownBase>>.Success(datas, "Thành công!");
        }*/
        public async Task<Response<Topic>> Update(TopicDto request)
        {
            var topic = _dbContext.Topics.FirstOrDefault(r => r.Id == request.Id);

            if (topic is null) return Response<Topic>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());
            if (_dbContext.Topics.Any(r => r.Id != request.Id && r.TopicName == request.TopicName))
            {
                return Response<Topic>.Error(StatusCode.InternalServerError, "Chủ đề đã tồn tại trên hệ thống!");
            }

            topic.TopicName = request.TopicName;
            topic.Description = request.Description;
            topic.DateModify = DateTime.Now;
            _dbContext.Topics.Update(topic);
            _dbContext.SaveChanges();
            return Response<Topic>.Success(topic, "Thành công!");
        }
    }
}