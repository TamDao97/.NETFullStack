using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Quiz.API.Common;
using Quiz.API.Data;
using Quiz.API.Dto;
using Quiz.API.Models;
using System.Text.RegularExpressions;

namespace Quiz.API.Services
{
    public interface IUserService
    {
        Task<Response<User>> Create(UserDto request);
        Task<User> Update(UserDto request);
        Task<bool> Delete(Guid id);
        Task<User> GetById(Guid id);
        Task<Response<List<UserDto>>> GetByFilter(UserGridRequestDto request);
    }

    public class UserService : IUserService
    {
        private QuizDbContext _dbContext;

        public UserService(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Response<User>> Create(UserDto request)
        {
            //Mô tả:
            //1.UserName là unique
            //2.Code là unique
            //3.PassWord là có ít nhất một ký tự đặc biệt
            if (_dbContext.Users.Any(r => r.UserName == request.UserName))
            {
                return Response<User>.Error(StatusCode.InternalServerError, "Username đã tồn tại trên hệ thống!");
            }

            //if (!Regex.IsMatch(request.PassWord, Constants.PassWordRegex))
            //{
            //    return Response<User>.Error(StatusCode.InternalServerError, "Mật khẩu phải có ít nhất một ký tự đặc biệt!");
            //}

            //GenCode
            string code;
            do
            {
                code = Utils.GenCodeUnique("US");
            } while (_dbContext.Users.AsNoTracking().Any(r => r.Code == code));

            var user = new User
            {
                Id = Guid.NewGuid(),
                Code = code,
                UserName = request.UserName,
                DisplayName = request.DisplayName,
                Gender = request.Gender,
                DateBirh = request.DateBirth,
                Address = request.Address,
                PasswordHash = request.PassWord,
                IsLockout = true,
                DateCreated = DateTime.Now,
            };

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return Response<User>.Success(user, "Thành công!");
        }

        public Task<bool> Delete(Guid id)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<List<UserDto>>> GetByFilter(UserGridRequestDto request)
        {
            var query = _dbContext.Users.AsNoTracking();

            if (!string.IsNullOrEmpty(request.KeyWord))
            {
                query = query.Where(r => r.UserName.ToUpper().Contains(request.KeyWord.Trim().ToUpper())
                                    || r.DisplayName.ToUpper().Contains(request.KeyWord.Trim().ToUpper()));
            }

            var totalItems = query.Count();
            var datas = query.Skip((request.Page - 1) * request.PageSize)
                            .Take(request.PageSize)
                            .Select(r => new UserDto
                            {
                                Code = r.Code,
                                UserName = r.UserName,
                                DisplayName = r.DisplayName,
                                Address = r.Address,
                                DateBirth = r.DateBirh,
                                Gender = r.Gender,
                            }).ToList();
            return Response<List<UserDto>>.Success(datas, "Thành công!");
        }

        public async Task<User> GetById(Guid id)
        {
            return _dbContext.Users.FirstOrDefault(r => r.Id == id);
        }

        public Task<User> Update(UserDto request)
        {
            throw new NotImplementedException();
        }
    }
}
