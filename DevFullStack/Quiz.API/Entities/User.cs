namespace Quiz.API.Models
{
    public class User : BaseEntity
    {
        public string Code { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public int Gender { get; set; }
        public DateTime? DateBirh { get; set; }
        public string? Address { get; set; }
        public string? PasswordHash { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsLockout { get; set; }
    }
}
