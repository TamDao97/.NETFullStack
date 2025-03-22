/*
 * Biến, Kiểu dữ liệu,....kiến thức cơ bản
 * BT1:Nhập vào 2 số a và b in kết quả của các phép tính ra màn hình (20 phút)
 * BT2:Hiển thị ký tự thứ k trong string (20 phút)
 * BT3:Đếm số lần xuất hiện của một ký tự trong một xâu
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
    }
}
