using Microsoft.EntityFrameworkCore;
using Quiz.API.Models;

namespace Quiz.API.Data
{
    public class QuizDbContext : DbContext
    {
        public QuizDbContext(DbContextOptions<QuizDbContext> options) : base(options) { }

        public DbSet<Topic> Topics { get; set; }
        //public DbSet<Question> Questions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Question> Questions { get; set; }
    }
}
