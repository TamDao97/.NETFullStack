/*
	1.Bài tập C# cơ bản: đảo ngược các ký tự trong 1 xâu
	2.Bài tập C# cơ bản: sắp xếp mảng theo thứ tự tăng dần
	3.Hiển thị ra màn hình các số chẵn trong mảng
	4.Quản lý Sinh viên
	- Viết một class Student có các thuộc tính sau:
		Id (int) - Mã sinh viên
		Name (string) - Tên sinh viên
		Age (int) - Tuổi
		GPA (double) - Điểm trung bình

	- Yêu cầu:
		+ Viết Contructor để khởi tạo giá trị.
		+ Viết phương thức Display() để hiển thị thông tin sinh viên.
		+ Viết một danh sách chứa nhiều sinh viên và hiển thị danh sách đó.
	
	5.Quản lý Hình chữ nhật
	- Viết một class Rectangle có:
		+ Thuộc tính Width và Height (double)
		+ Constructor để khởi tạo giá trị
		+ Phương thức GetArea() tính diện tích
		+ Phương thức GetPerimeter() tính chu vi
		+ Phương thức Display() hiển thị thông tin
		+ Tạo một đối tượng Rectangle, nhập dữ liệu từ bàn phím và hiển thị kết quả.
 */

using System.Text;

namespace DevFullStack
{
    public class Buoi1_Btvn
    {
        /// <summary>
        /// Bài tập C# cơ bản: đảo ngược các ký tự trong 1 xâu
        /// </summary>
        public static void BaiTap1()
        {
            // Đặt Encoding UTF-8 để hiển thị tiếng Việt đúng
            Console.OutputEncoding = Encoding.UTF8;

            // Nhập a từ bàn phím
            Console.Write("Nhập số chuỗi ký tự: ");
            string strChuoi = Console.ReadLine();

            string strChuoiDaoNguoc = "";
            for (int i = strChuoi.Length - 1; i >= 0; i--)
            {
                strChuoiDaoNguoc += strChuoi[i];
            }

            Console.WriteLine($"Chuỗi đảo ngược là: {strChuoiDaoNguoc}");
            Console.ReadKey();
        }

        /// <summary>
        /// Sắp xếp mảng theo thứ tự tăng dần
        /// </summary>
        public static void BaiTap2()
        {
            // Đặt Encoding UTF-8 để hiển thị tiếng Việt đúng
            Console.OutputEncoding = Encoding.UTF8;

            // Nhập a từ bàn phím
            Console.Write("Nhập số phần tử trong mảng: ");
            int length = Convert.ToInt32(Console.ReadLine());

            int[] arr = new int[length];

            for (int i = 0; i < arr.Length; i++)
            {
                arr[i] = Convert.ToInt32(Console.ReadLine());
            }

            for (int i = 0; i < arr.Length - 1; i++)
            {
                for (int j = i + 1; j < arr.Length; j++)
                {
                    if (arr[i] > arr[j])
                    {
                        int temp = arr[i];
                        arr[i] = arr[j];
                        arr[j] = temp;
                    }
                }
            }

            Console.Write($"Mảng được sắp xếp theo thứ tự tăng dần: ");

            for (int i = 0; i < arr.Length; i++)
            {
                Console.Write(arr[i] + " ");
            }
            Console.ReadKey();
        }

        ///// <summary>
        ///// Hiển thị ra màn hình các số chẵn trong mảng
        ///// </summary>
        //public static void BaiTap2()
        //{
        //    // Đặt Encoding UTF-8 để hiển thị tiếng Việt đúng
        //    Console.OutputEncoding = Encoding.UTF8;

        //    // Nhập a từ bàn phím
        //    Console.Write("Nhập số phần tử trong mảng: ");
        //    int length = Convert.ToInt32(Console.ReadLine());

        //    int[] arr = new int[length];

        //    for (int i = 0; i < arr.Length; i++)
        //    {
        //        arr[i] = Convert.ToInt32(Console.ReadLine());
        //    }

        //    for (int i = 0; i < arr.Length - 1; i++)
        //    {
        //        for (int j = i + 1; j < arr.Length; j++)
        //        {
        //            if (arr[i] > arr[j])
        //            {
        //                int temp = arr[i];
        //                arr[i] = arr[j];
        //                arr[j] = temp;
        //            }
        //        }
        //    }

        //    Console.Write($"Mảng được sắp xếp theo thứ tự tăng dần: ");

        //    for (int i = 0; i < arr.Length; i++)
        //    {
        //        Console.Write(arr[i] + " ");
        //    }
        //    Console.ReadKey();
        //}
    }
}
