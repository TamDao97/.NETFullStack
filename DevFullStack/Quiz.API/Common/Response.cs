using Quiz.API.Models;
using System.ComponentModel;

namespace Quiz.API.Common
{
    public enum StatusCode
    {
        [Description("Thành công!")]
        Ok = 200,
        [Description("Dữ liệu đầu vào không chính xác!")]
        BadRequest = 400,
        [Description("Không có quyền truy cập dữ liệu!")]
        Unauthorized = 401,
        [Description("Không có quyền truy cập!")]
        Forbidden = 403,
        [Description("Không tìm thấy dữ liệu trên hệ thống!")]
        NotFound = 404,
        [Description("Phương thức không được hỗ trợ!")]
        MethodNotAllowed = 405,
        [Description("Lỗi hệ thống!")]
        InternalServerError = 500
    };

    public class Response<T> where T : new()
    {
        public StatusCode Status { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }

        public static Response<T> Success(T data, string message)
        {
            return new Response<T>
            {
                Status = StatusCode.Ok,
                Data = data,
                Message = message
            };
        }

        public static Response<T> Error(StatusCode status, string message, T data = default)
        {
            return new Response<T>
            {
                Status = status,
                Message = message,
                Data = data,
            };
        }
    }
}
