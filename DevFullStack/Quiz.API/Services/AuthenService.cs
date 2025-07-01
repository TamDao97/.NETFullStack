using Quiz.API.Common;
using Quiz.API.Data;
using Quiz.API.Dto;
using Quiz.API.Models;

namespace Quiz.API.Services
{
    public interface IAuthenService
    {
        Task<Response<CurrentUserReponseDto>> LoginAsync(LoginRequestDto reqDto);
        Task<Response<bool>> RegisterAsync(RegisterRequestDto reqDto);
        Task<object> ChangePasswordAsync(ChangePasswordRequestDto reqDto);
    }

    public class AuthenService : IAuthenService
    {
        private QuizDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public AuthenService(QuizDbContext dbContext, IConfiguration configuration)
        {
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public Task<object> ChangePasswordAsync(ChangePasswordRequestDto reqDto)
        {
            throw new NotImplementedException();
        }

        public async Task<Response<CurrentUserReponseDto>> LoginAsync(LoginRequestDto reqDto)
        {
            var user = _dbContext.Users.FirstOrDefault(r => r.UserName == reqDto.UserName);

            if (user is null)
                return Response<CurrentUserReponseDto>.Error(StatusCode.InternalServerError, "Tài khoản không tồn tại trên hệ thống!");

            if (!Utils.VerifyPassword(user.PasswordHash, reqDto.Password))
                return Response<CurrentUserReponseDto>.Error(StatusCode.InternalServerError, "Thông tin đăng nhập không chính xác!");

            var token = JwtHelper.GenerateToken(reqDto.UserName, _configuration);

            CurrentUserReponseDto currentUser = new CurrentUserReponseDto
            {
                Id = user.Id,
                UserName = user.UserName,
                DisplayName = user.DisplayName,
                IsAdmin = user.IsAdmin,
                AccessToken = token.AccessToken,
                RefreshToken = token.RefreshToken,
            };

            return Response<CurrentUserReponseDto>.Success(currentUser, StatusCode.Ok.ToDescription());
        }

        public async Task<Response<bool>> RegisterAsync(RegisterRequestDto req)
        {
            //if (IsDuplicated(ref errorMess, nameof(req.UserName), req.UserName))
            //    return Response<bool>.Error(StatusCode.InternalServerError, errorMess);

            var user = new User
            {
                Id = Guid.NewGuid(),
                UserName = req.UserName,
                DisplayName = req.UserName,
                //Email = req.UserName,
                PasswordHash = Utils.HashPassword(req.Password)
            };

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();

            return Response<bool>.Success(true, StatusCode.Ok.ToDescription());
        }
    }
}
