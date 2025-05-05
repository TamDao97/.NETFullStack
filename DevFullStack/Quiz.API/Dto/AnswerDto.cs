namespace Quiz.API.Dto
{
    public class AnswerDto : BaseDto
    {
        public Guid IdQuestion { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool IsTrue { get; set; }
    }
}
