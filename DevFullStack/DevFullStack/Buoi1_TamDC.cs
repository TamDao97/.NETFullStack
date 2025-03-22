
/*
 * BT1: ĐẾM SỐ LẦN XUẤT HIỆN CỦA KÝ TỰ TRONG CHUỖI NHẬP VÀO
 * BT2: CHUYỂN CÁC KÝ TỰ IN THƯỜNG SANG IN HOA
 */
//BÀI 

using System.Text;

namespace DevFullStack
{
    public partial class Buoi1
    {
        public static void Excercise1()
        {
            // Đặt Encoding UTF-8 để hiển thị tiếng Việt đúng
            Console.OutputEncoding = Encoding.UTF8;

            // Nhập a từ bàn phím
            Console.Write("Nhập chuỗi ký tự: ");
            string strChuoi = Console.ReadLine();

            Console.Write("Nhập ký tự muốn đếm số lần xuất hiện: ");
            char strKyTu = Convert.ToChar(Console.ReadLine());

            int dem = 0;
            for (int i = 0; i < strChuoi.Length; i++)
            {
                if (strChuoi[i] == strKyTu)
                {
                    dem = dem + 1;
                }
            }

            Console.Write($"Số lần xuất hiện {strKyTu}: {dem} lần.");
        }

        public static void Excercise2()
        {
            // Đặt Encoding UTF-8 để hiển thị tiếng Việt đúng
            Console.OutputEncoding = Encoding.UTF8;

            // Nhập a từ bàn phím
            Console.Write("Nhập chuỗi ký tự: ");
            string strChuoi = Console.ReadLine();

            string strOutput = "";
            for (int i = 0; i < strChuoi.Length; i++)
            {
                if (char.IsLower(strChuoi[i]))
                {
                    strOutput = strOutput + char.ToUpper(strChuoi[i]);
                }
                else
                {
                    strOutput = strOutput + strChuoi[i];
                }
            }

            Console.Write($"Chuỗi ký tự sau khi được chuyển sang in Hoa là {strOutput}.");
            Console.ReadKey();
        }
    }
}
