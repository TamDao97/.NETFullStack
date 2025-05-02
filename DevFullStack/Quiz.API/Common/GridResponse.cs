namespace Quiz.API.Common
{
    public class GridResponse<T> where T : class, new()
    {
        public int TotalRecord { get; set; }
        public List<T> Datas { get; set; } = new List<T>();
    }
}
