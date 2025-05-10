using System;
using System.ComponentModel;
using System.Reflection;

namespace Quiz.API.Common
{
    public static class Utils
    {
        private static Random random = new Random();

        #region Auth
        public static string HashPassword(string password)
        {
            // Sử dụng Bcrypt để mã hóa mật khẩu
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        public static bool VerifyPassword(string hashedPassword, string providedPassword)
        {
            // Xác thực mật khẩu đã mã hóa với mật khẩu do người dùng cung cấp
            return BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);
        }
        #endregion

        #region extension methods

        public static string GenCodeUnique(string prefix)
        {
            int number = random.Next(0, 100_000_000); // số từ 0 đến 99,999,999
            return $"{prefix}{number.ToString("D8")}"; // luôn đảm bảo 8 chữ số, thêm số 0 đầu nếu cần
        }

        public static string ToDescription(this Enum value)
        {
            FieldInfo field = value.GetType().GetField(value.ToString());

            if (field != null)
            {
                DescriptionAttribute attribute = field.GetCustomAttribute<DescriptionAttribute>();
                if (attribute != null)
                    return attribute.Description;
            }

            return value.ToString(); // fallback nếu không có Description
        }
        #endregion
    }
}
