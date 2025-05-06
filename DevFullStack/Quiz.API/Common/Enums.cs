using System.ComponentModel;

namespace Quiz.API.Common
{
    public enum EnumGender
    {
        [Description("Nam")]
        Male,
        [Description("Nữ")]
        Female,
        [Description("Khác")]
        Orther,
    }

    public enum EnumQuestionType
    {
        [Description("Câu hỏi một đáp án đúng")]
        SingleChoice,
        [Description("Câu hỏi nhiều đáp án đúng")]
        MultiChoice,
        [Description("Câu hỏi đúng/sai")]
        TrueOrFalse,
        [Description("Câu hỏi sắp xếp thứ tự")]
        OrderingOrSequencing,
    }

    public enum EnumQuestionLevel
    {
        [Description("Dễ")]
        Easy,
        [Description("Trung bình")]
        Medium,
        [Description("Khó")]
        Hard,
    }
}
