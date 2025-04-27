using Quiz.API.Models;

namespace Quiz.API.Dto
{
    public class QuestionDto
    {
       
            public Guid IdTopic { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public string Content { get; set; }
            public string Description { get; set; }
        
    }
}
