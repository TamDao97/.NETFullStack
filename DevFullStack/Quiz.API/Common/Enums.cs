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
}
