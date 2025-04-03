using Quiz.API.Data;
using Quiz.API.Dto;
using Quiz.API.Models;

namespace Quiz.API.Services
{
    public interface IUserService
    {
        Task<User> Create(UserDto request);
        Task<User> Update(UserDto request);
        Task<bool> Delete(Guid id);
        Task<User> GetById(Guid id);
        //Task<User> GetByName(string name);
    }

    public class UserService : IUserService
    {
        private QuizDbContext _dbContext;

        public UserService(QuizDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> Create(UserDto request)
        {
            var user = new User
            {
                Id = Guid.NewGuid(),
                Code = request.Code,
                UserName = request.UserName,
                DisplayName = request.DisplayName,
                Gender = request.Gender,
                DateBirh = request.DateBirh,
                Address = request.Address,
                PassWord = request.PassWord,
                IsLockout = true,
                DateCreated = DateTime.Now,
            };

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
            return user;
        }

        public Task<bool> Delete(Guid id)
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
