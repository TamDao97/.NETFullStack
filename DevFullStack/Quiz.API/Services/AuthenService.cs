using Quiz.API.Common;
using Quiz.API.Data;
using Quiz.API.Dto;

namespace Quiz.API.Services
{
    public interface IAuthenService
    {
        Task<object> LoginAsync(LoginRequestDto reqDto);
        Task<object> RegisterAsync(RegisterRequestDto reqDto);
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

        public async Task<object> LoginAsync(LoginRequestDto reqDto)
        {
            var user = _dbContext.Users.FirstOrDefault(r => r.UserName == reqDto.UserName);

            if (user == null)
            {
                return Response<object>.Error(StatusCode.NotFound, "không tìm thấy dữ liệu trên hệ thống!", null);
            }

            if (!Utils.VerifyPassword(user.PasswordHash, reqDto.Password))
            {
                return Response<object>.Error(StatusCode.InternalServerError, "Mật khẩu không chính xác!", null);
            }

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

            return Response<object>.Success(currentUser, "Thành công!");
        }

        public Task<object> RegisterAsync(RegisterRequestDto reqDto)
        {
            throw new NotImplementedException();
        }
    }
}
