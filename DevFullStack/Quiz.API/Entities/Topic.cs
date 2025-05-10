namespace Quiz.API.Models
{
    public class Topic : BaseEntity
    {
        public string Code { get; set; }
        public string TopicName { get; set; }
        public string? Description { get; set; }
    }
}
