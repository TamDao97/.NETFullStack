using Quiz.API.Models;
using System.ComponentModel;

namespace Quiz.API.Common
{
    public enum StatusCode
    {
        Ok = 200, //Thành công!
        BadRequest = 400, //Dữ liệu đầu vào không chính xác!
        Unauthorized = 401, //Không có quyền truy cập dữ liệu!
        Forbidden = 403, //Không có quyền truy cập!
        NotFound = 404, //Không tìm thấy dữ liệu trên hệ thống!
        MethodNotAllowed = 405, //Phương thức không được hỗ trợ!
        InternalServerError = 500 //Lỗi hệ thống!
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
