using Quiz.API.Models;

namespace Quiz.API.Entities
{
    public class Answer : BaseEntity
    {
        public Guid IdQuestion { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public bool IsTrue { get; set; }
    }
}
