namespace Quiz.API.Models
{
    public class Question : BaseEntity
    {
        public Guid IdTopic { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
    }
}
