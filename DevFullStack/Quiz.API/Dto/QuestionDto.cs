using Quiz.API.Common;
using Quiz.API.Models;

namespace Quiz.API.Dto
{
    public class QuestionDto : BaseDto
    {
        public Guid IdTopic { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Description { get; set; }
        public EnumQuestionType QuestionType { get; set; }
        public EnumQuestionLevel QuestionLevel { get; set; }
    }

    public class QuestionCreateRequestDto
    {
        public Guid? Id { get; set; }
        public Guid IdTopic { get; set; }
        public string Content { get; set; }
        public EnumQuestionType QuestionType { get; set; }
        public EnumQuestionLevel QuestionLevel { get; set; }
        public List<AnswerCreateRequestDto> Answers = new List<AnswerCreateRequestDto>();
    }

    public class AnswerCreateRequestDto
    {
        public Guid IdQuestion { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool IsTrue { get; set; }
    }
}
