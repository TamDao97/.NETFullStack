using Quiz.API.Common;

namespace Quiz.API.Dto
{
    public class UserDto : BaseDto
    {
        public string? Code { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public EnumGender? Gender { get; set; }
        public string? GenderText { get { return Gender.HasValue ? Gender.ToDescription() : ""; } }
        public DateTime? DateBirth { get; set; }
        public string? Address { get; set; }
        public string? PassWord { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsLockout { get; set; }
        public string IsLockoutText { get { return IsLockout ? "Khóa" : "Hoạt động"; } }
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

    public class UserGridRequestDto
    {
        public string? KeyWord { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
