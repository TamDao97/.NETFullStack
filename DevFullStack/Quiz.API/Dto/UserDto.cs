namespace Quiz.API.Dto
{
    public class UserDto
    {
        public string Code { get; set; }
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public int Gender { get; set; }
        public DateTime? DateBirh { get; set; }
        public string? Address { get; set; }
        public string? PassWord { get; set; }
    }
}
