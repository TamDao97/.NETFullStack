/*
 * BIẾN, KIỂU DỮ LIỆU,....KIẾN THỨC CƠ BẢN
 * BT1:NHẬP VÀO 2 SỐ A VÀ B IN KẾT QUẢ CỦA CÁC PHÉP TÍNH RA MÀN HÌNH (20 PHÚT)
 * BT2:HIỂN THỊ KÝ TỰ THỨ K TRONG STRING (20 PHÚT)
 * BT3:ĐẾM SỐ LẦN XUẤT HIỆN CỦA MỘT KÝ TỰ TRONG MỘT XÂU
 * BT4:ĐẾM SỐ LẦN XUẤT HIỆN CỦA KÝ TỰ TRONG CHUỖI NHẬP VÀO
 * BT5:CHUYỂN CÁC KÝ TỰ IN THƯỜNG SANG IN HOA
 */

using System.Text;
namespace DevFullStack
{
    public partial class Buoi1
    {
        public static void BaiTap1()
        {
            // Đặt Encoding UTF-8 để hiển thị tiếng Việt đúng
            Console.OutputEncoding = Encoding.UTF8;

            // Nhập a từ bàn phím
            Console.Write("Nhập số a: ");
            double a = Convert.ToDouble(Console.ReadLine());

            // Nhập b từ bàn phím
            Console.Write("Nhập số b: ");
            double b = Convert.ToDouble(Console.ReadLine());

            // Tính toán và hiển thị kết quả
            Console.WriteLine("\nKết quả các phép toán:dem");
            Console.WriteLine($"{a} + {b} = {a + b}");
            Console.WriteLine($"{a} - {b} = {a - b}");
            Console.WriteLine($"{a} * {b} = {a * b}");

            // Kiểm tra chia cho 0
            if (b != 0)
                Console.WriteLine($"{a} / {b} = {a / b}");
            else
                Console.WriteLine("Không thể chia cho 0!");

            Console.WriteLine("Nhấn phím bất kỳ để thoát...");
            Console.ReadKey();
        }

        public static void BaiTap2()
        {
            // Đặt Encoding UTF-8 để hiển thị tiếng Việt đúng
            Console.OutputEncoding = Encoding.UTF8;

            Console.Write($"Nhập vào chuỗi ký tự: ");
            string chuoiKyTu = Console.ReadLine();

            Console.Write($"Tìm ký tự thứ: ");
            int position = int.Parse(Console.ReadLine());
            Console.Write($"Ký tự thứ {position} trong chuỗi là: {chuoiKyTu[position]}");
            Console.ReadKey();
        }

        public static void BaiTap3()
        {
            // Đặt Encoding UTF-8 để hiển thị tiếng Việt đúng
            Console.OutputEncoding = Encoding.UTF8;

            Console.Write($"Nhập vào chuỗi ký tự: ");
            string chuoiKyTu = Convert.ToString(Console.ReadLine());

            Console.Write($"Đếm số lần xuất hiện trong chuỗi {chuoiKyTu} của ký tự: ");
            int position = int.Parse(Console.ReadLine());
            Console.Write($"Ký tự thứ {position} trong chuỗi là: {chuoiKyTu[position]}");
            Console.ReadKey();
        }

        public static void BaiTap4()
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

        public static void BaiTap5()
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
