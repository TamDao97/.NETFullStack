namespace Quiz.API.Dto
{
    public class TopicDto : BaseDto
    {
        public string? Code { get; set; }
        public string TopicName { get; set; }
        public string? Description { get; set; }

    }
    public class TopicGridRequestDto
    {
        public string? KeyWord { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
