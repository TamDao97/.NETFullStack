namespace Quiz.API.Common
{
    public class Utils
    {
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
        private static readonly Random random = new Random();

        public static string GenCodeUnique(string prefix)
        {
            int number = random.Next(0, 100_000_000); // số từ 0 đến 99,999,999
            return $"{prefix}{number.ToString("D8")}"; // luôn đảm bảo 8 chữ số, thêm số 0 đầu nếu cần
        }
        #endregion
    }
}
