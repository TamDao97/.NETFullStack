export class Base64UploadAdapter {
  constructor(private loader: any) {}

  upload() {
    return this.loader.file.then((file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve({
            default: reader.result as string, // Convert ảnh thành Base64
          });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Đọc file ảnh dưới dạng Base64
      });
    });
  }

  abort() {
    // Không cần xử lý hủy upload
  }
}
