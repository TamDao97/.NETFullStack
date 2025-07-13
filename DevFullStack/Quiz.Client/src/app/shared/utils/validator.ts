import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function emailOrPhoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^(?:\+84|0)[3|5|7|8|9][0-9]{8}$/; // Ví dụ cho số điện thoại Việt Nam

    if (value && (emailPattern.test(value) || phonePattern.test(value))) {
      return null; // Nếu là email hoặc số điện thoại hợp lệ
    }

    return { invalidEmailOrPhone: true }; // Nếu không hợp lệ
  };
}
