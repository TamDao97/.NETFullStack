namespace Quiz.API.Dto
{
    public class UserDto
    {
        public string Code { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public int Gender { get; set; }
        public DateTime? DateBirth { get; set; }
        public string? Address { get; set; }
        public string? PassWord { get; set; }
    }

    public class LoginRequestDto
    {
        /// <summary>
        /// UserName là sđt hoặc email
        /// </summary>
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class RegisterRequestDto
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PasswordConfirm { get; set; }
    }

    public class ChangePasswordRequestDto
    {
        public string UserName { get; set; }
        public string OldPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmPassword { get; set; }
    }

    public class CurrentUserReponseDto
    {
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public bool IsAdmin { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public List<string> Permissions { get; set; } = new List<string>();
    }
}
