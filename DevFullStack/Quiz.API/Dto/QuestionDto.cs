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
        public string? Description { get; set; }
        public EnumQuestionType QuestionType { get; set; }
        public EnumQuestionLevel QuestionLevel { get; set; }
        public List<AnswerCreateRequestDto> Answers { get; set; } = new List<AnswerCreateRequestDto>();
    }

    public class AnswerCreateRequestDto
    {
        public Guid IdQuestion { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool IsTrue { get; set; }
    }

    public class QuestionGridFilterRequestDto : GridBase
    {
        public string? KeyWord { get; set; }
    }

    public class QuestionGridResponseDto
    {
        public Guid Id { get; set; }
        public string QuestionCode { get; set; }
        public string? QuestionName { get; set; }
        public string TopicName { get; set; }
        public EnumQuestionType QuestionType { get; set; }
        public EnumQuestionType QuestionTypeText { get; set; }
        public EnumQuestionLevel QuestionLevel { get; set; }
        public EnumQuestionLevel QuestionLevelText { get; set; }
        public string? Content { get; set; }
        public DateTime DateModify { get; set; }
        public Guid ModifyUserId { get; set; }
        public string ModifyUserName { get; set; }
    }

    public class QuestionDetailResponseDto : QuestionCreateRequestDto
    {
    }
}
