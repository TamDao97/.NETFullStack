using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Quiz.API.Models
{
    //public class BaseEntity
    //{
    //    [Key]
    //    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    //    public Guid Id { get; set; }
    //    public DateTime DateCreated { get; set; }
    //    public DateTime DateModify { get; set; }
    //    public Guid CreatedUserId { get; set; }
    //    public Guid ModifyUserId { get; set; }
    //    public bool IsDeleted { get; set; }
    //    public int Order { get; set; }
    //}

    public class BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModify { get; set; }
        public Guid CreatedUserId { get; set; }
        public Guid ModifyUserId { get; set; }
        public bool IsDeleted { get; set; }
    }
}
