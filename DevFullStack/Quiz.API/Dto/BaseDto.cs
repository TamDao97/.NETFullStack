namespace Quiz.API.Dto
{
    public class BaseDto
    {
        public Guid? Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModify { get; set; }
        public Guid CreatedUserId { get; set; }
        public Guid ModifyUserId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
