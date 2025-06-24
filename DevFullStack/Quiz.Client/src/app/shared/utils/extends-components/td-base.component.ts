import { AbstractControl, FormGroup, FormArray } from "@angular/forms";

export class TdBaseComponent {

  constructor() { }

  /**
   * Validate form
   * @param frmGroup validate formGroup
   * @returns
   */
  validateForm(form: AbstractControl): boolean {
    if (form instanceof FormGroup || form instanceof FormArray) {
      Object.values(form.controls).forEach((control) => {
        this.validateForm(control); // Đệ quy cho control con
      });
    }
    form.markAsTouched({ onlySelf: true });
    form.markAsDirty({ onlySelf: true });
    form.updateValueAndValidity({ onlySelf: true });
    return form.valid;
  }
}
