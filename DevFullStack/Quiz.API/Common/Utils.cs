using System;

namespace Quiz.API.Common
{
    public class Utils
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

        #region Extension Methods
        public static string GenerateUniqueCode(string prefix)
        {
            return $"{prefix}{random.Next(10000000, 100000000).ToString()}"; // 8 chữ số
        }
        #endregion
    }
}
