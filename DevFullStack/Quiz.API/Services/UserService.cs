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
        Task<Response<User>> Update(UserDto request);
        Task<Response<bool>> Delete(Guid id);
        Task<Response<UserDto>> GetById(Guid id);
        Task<Response<GridResponse<UserDto>>> Search(UserGridRequestDto request);
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

        public async Task<Response<bool>> Delete(Guid id)
        {
            var user = _dbContext.Users.FirstOrDefault(r => r.Id == id);

            if (user is null) return Response<bool>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());

            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
            return Response<bool>.Success(true, StatusCode.Ok.ToDescription());
        }

        public async Task<Response<GridResponse<UserDto>>> Search(UserGridRequestDto request)
        {
            var query = _dbContext.Users.AsNoTracking();

            if (!string.IsNullOrEmpty(request.KeyWord))
            {
                query = query.Where(r => r.UserName.ToUpper().Contains(request.KeyWord.Trim().ToUpper())
                                    || r.DisplayName.ToUpper().Contains(request.KeyWord.Trim().ToUpper())
                                    || r.Code.ToUpper().Contains(request.KeyWord.Trim().ToUpper()));
            }

            var totalRecord = query.Select(r => r.Id).Count();
            var datas = query.Skip((request.Page - 1) * request.PageSize)
                            .Take(request.PageSize)
                            .Select(r => new UserDto
                            {
                                Id = r.Id,
                                Code = r.Code,
                                UserName = r.UserName,
                                DisplayName = r.DisplayName,
                                Address = r.Address,
                                DateBirth = r.DateBirh,
                                Gender = r.Gender,
                                IsLockout = r.IsLockout,
                                IsAdmin = r.IsAdmin,
                            }).ToList();
            return Response<GridResponse<UserDto>>.Success(new GridResponse<UserDto>
            {
                TotalRecord = totalRecord,
                Datas = datas
            }, "Thành công!");
        }

        public async Task<Response<UserDto>> GetById(Guid id)
        {
            var userRes = _dbContext.Users.Select(r => new UserDto
            {
                Id = r.Id,
                UserName = r.UserName,
                //PassWord = r.PasswordHash,
                DisplayName = r.DisplayName,
                Gender = r.Gender,
                Address = r.Address,
                DateBirth = r.DateBirh,
            }).FirstOrDefault(r => r.Id == id);

            if (userRes == null) return Response<UserDto>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());
            return Response<UserDto>.Success(userRes, "Thành công!");
        }

        public async Task<Response<User>> Update(UserDto request)
        {
            var user = _dbContext.Users.FirstOrDefault(r => r.Id == request.Id);

            if (user is null) return Response<User>.Error(StatusCode.NotFound, StatusCode.NotFound.ToDescription());

            user.DisplayName = request.DisplayName;
            user.Gender = request.Gender;
            user.DateBirh = request.DateBirth;
            user.Address = request.Address;
            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
            return Response<User>.Success(user, "Thành công!");
        }
    }
}
