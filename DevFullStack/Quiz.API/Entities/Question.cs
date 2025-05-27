using Quiz.API.Common;

namespace Quiz.API.Models
{
    public class Question : BaseEntity
    {
        public Guid IdTopic { get; set; }
        public EnumQuestionType QuestionType { get; set; }
        public EnumQuestionLevel QuestionLevel { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string? Description { get; set; }
    }
}
