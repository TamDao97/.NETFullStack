<<<<<<< HEAD
﻿using System;
=======
﻿using System.ComponentModel;
using System.Reflection;
>>>>>>> 01dc023bf5e8f8d801636f87f68cbd453e858008

namespace Quiz.API.Common
{
    public static class Utils
    {
<<<<<<< HEAD
        private static Random random = new Random();

=======
>>>>>>> 01dc023bf5e8f8d801636f87f68cbd453e858008
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

<<<<<<< HEAD
        #region Extension Methods
        public static string GenerateUniqueCode(string prefix)
        {
            return $"{prefix}{random.Next(10000000, 100000000).ToString()}"; // 8 chữ số
=======
        #region extension methods
        private static readonly Random random = new Random();

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
>>>>>>> 01dc023bf5e8f8d801636f87f68cbd453e858008
        }
        #endregion
    }
}
