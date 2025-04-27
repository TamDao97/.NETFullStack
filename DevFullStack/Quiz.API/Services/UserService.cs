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
        Task<User> GetByFilter(string name);
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

            if (_dbContext.Users.Any(r => r.Code == request.Code))
            {
                return Response<User>.Error(StatusCode.InternalServerError, "Mã tài khoản đã tồn tại trên hệ thống!");
            }

            if (!Regex.IsMatch(request.PassWord, Constants.PassWordRegex))
            {
                return Response<User>.Error(StatusCode.InternalServerError, "Mật khẩu phải có ít nhất một ký tự đặc biệt!");
            }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Code = request.Code,
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

        public Task<User> GetByFilter(string name)
        {
            throw new NotImplementedException();
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
