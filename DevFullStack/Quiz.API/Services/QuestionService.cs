using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Quiz.API.Common;
using Quiz.API.Data;
using Quiz.API.Dto;
using Quiz.API.Entities;
using Quiz.API.Models;
using System.Net.WebSockets;
using System.Text.RegularExpressions;

namespace Quiz.API.Services
{
    public interface IQuestionService
    {
        Task<Response<bool>> Create(QuestionCreateRequestDto request);
        Task<Response<bool>> Update(QuestionCreateRequestDto request);
        Task<Response<bool>> Delete(Guid id);
        Task<Response<QuestionDetailResponseDto>> GetById(Guid id);
        Task<Response<GridResponse<QuestionGridResponseDto>>> Search(QuestionGridFilterRequestDto request);
    }
    public class QuestionService : IQuestionService
    {
        private QuizDbContext _dbContext;

        public QuestionService(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response<bool>> Create(QuestionCreateRequestDto request)
        {
            try
            {
                //GenCode
                string code;
                do
                {
                    code = Utils.GenCodeUnique("QT");
                } while (_dbContext.Users.AsNoTracking().Any(r => r.Code == code));

                var question = new Question
                {
                    Id = Guid.NewGuid(),
                    Code = code,
                    Content = request.Content,
                    Description = request.Description,
                    IdTopic = request.IdTopic,
                    QuestionType = request.QuestionType,
                    QuestionLevel = request.QuestionLevel,
                };

                var lstAnswer = new List<Answer>();
                foreach (var item in request.Answers)
                {
                    lstAnswer.Add(new Answer
                    {
                        Id = Guid.NewGuid(),
                        IdQuestion = question.Id,
                        Content = item.Content,
                        IsTrue = item.IsTrue,
                    });
                }

                using (var trans = _dbContext.Database.BeginTransaction())
                {
                    _dbContext.Questions.Add(question);
                    _dbContext.Answers.AddRange(lstAnswer);
                    _dbContext.SaveChanges();
                }
                return Response<bool>.Success(true, "Thành công!");
            }
            catch (Exception ex)
            {
                return Response<bool>.Error(StatusCode.InternalServerError, ex.Message);
            }
        }

        public async Task<Response<bool>> Delete(Guid id)
        {
            try
            {
                var question = _dbContext.Questions.FirstOrDefault(r => r.Id == id);
                if (question == null) return Response<bool>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());

                var answers = _dbContext.Answers.Where(r => r.IdQuestion == id);
                using (var trans = _dbContext.Database.BeginTransaction())
                {
                    _dbContext.Questions.Remove(question);
                    _dbContext.Answers.RemoveRange(answers);
                    _dbContext.SaveChanges();
                }
                return Response<bool>.Success(true, "Thành công!");
            }
            catch (Exception ex)
            {
                return Response<bool>.Error(StatusCode.InternalServerError, ex.Message);
            }
        }

        public async Task<Response<GridResponse<QuestionGridResponseDto>>> Search(QuestionGridFilterRequestDto request)
        {
            var query = from q in _dbContext.Questions
                        join t in _dbContext.Topics on q.IdTopic equals t.Id
                        select new QuestionGridResponseDto
                        {
                            Id = q.Id,
                            QuestionCode = q.Code,
                            QuestionName = q.Name,
                            Content = q.Content,
                            TopicName = t.TopicName,
                            DateModify = q.DateModify,
                        };

            if (!string.IsNullOrEmpty(request.KeyWord))
            {
                query = query.Where(r => r.QuestionName.Trim().ToUpper().Contains(request.KeyWord.Trim().ToUpper()));
            }

            var totalRecord = query.Select(r => r.Id).Count();
            var datas = query.OrderByDescending(r => r.DateModify).Skip((request.Page - 1) * request.PageSize)
                            .Take(request.PageSize)
                            .ToList();

            return Response<GridResponse<QuestionGridResponseDto>>.Success(new GridResponse<QuestionGridResponseDto>
            {
                TotalRecord = totalRecord,
                Datas = datas
            }, "Thành công!");
        }

        public async Task<Response<QuestionDetailResponseDto>> GetById(Guid id)
        {
            var item = (from q in _dbContext.Questions
                        join t in _dbContext.Topics on q.IdTopic equals t.Id
                        where q.Id == id
                        select new QuestionDetailResponseDto
                        {
                            Id = q.Id,
                            IdTopic = q.IdTopic,
                            Content = q.Content,
                            Description = q.Description,
                            QuestionType = q.QuestionType,
                            QuestionLevel = q.QuestionLevel,
                            Answers = (from a in _dbContext.Answers
                                       where a.IdQuestion == q.Id
                                       select new AnswerCreateRequestDto
                                       {
                                           IdQuestion = a.IdQuestion,
                                           Name = a.Name,
                                           Content = a.Content,
                                           IsTrue = a.IsTrue
                                       }).ToList()
                        }).FirstOrDefault();

            if (item is null) return Response<QuestionDetailResponseDto>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());
            return Response<QuestionDetailResponseDto>.Success(item, "Thành công!");
        }

        public async Task<Response<bool>> Update(QuestionCreateRequestDto request)
        {
            try
            {
                var question = _dbContext.Questions.FirstOrDefault(r => r.Id == request.Id);
                if (question == null) return Response<bool>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());

                question.Content = request.Content;
                question.Description = request.Description;
                question.IdTopic = request.IdTopic;
                question.QuestionType = request.QuestionType;
                question.QuestionLevel = request.QuestionLevel;

                var lstAnswerRemove = _dbContext.Answers.Where(r => r.IdQuestion == question.Id);
                var lstAnswer = new List<Answer>();
                foreach (var item in request.Answers)
                {
                    lstAnswer.Add(new Answer
                    {
                        Id = Guid.NewGuid(),
                        IdQuestion = question.Id,
                        Content = item.Content,
                        IsTrue = item.IsTrue,
                    });
                }

                using (var trans = _dbContext.Database.BeginTransaction())
                {
                    _dbContext.Questions.Add(question);
                    _dbContext.Answers.RemoveRange(lstAnswerRemove);
                    _dbContext.Answers.AddRange(lstAnswer);
                    _dbContext.SaveChanges();
                }
                return Response<bool>.Success(true, "Thành công!");
            }
            catch (Exception ex)
            {
                return Response<bool>.Error(StatusCode.InternalServerError, ex.Message);
            }
        }
    }
}
