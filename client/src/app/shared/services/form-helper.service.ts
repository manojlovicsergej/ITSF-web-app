import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

/**
 * Sadrži metode za validaciju forme
 */
@Injectable({
  providedIn: 'root',
})
export class FormHelperService {
  /**
   * Prode kroz celu formu sve potrebne komponente markuje na dirty
   * @param form forma za invalidaciju
   */
  invalidateForm(form: FormGroup) {
    this.markGroupDirty(form);
  }

  private markGroupDirty(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key) => {
      switch (formGroup.get(key)?.constructor.name) {
        case 'FormGroup':
          this.markGroupDirty(formGroup.get(key) as FormGroup);
          break;
        case 'FormArray':
          this.markArrayDirty(formGroup.get(key) as FormArray);
          break;
        case 'FormControl':
          this.markControlDirty(formGroup.get(key) as FormControl);
          break;
      }
    });
  }

  private markArrayDirty(formArray: FormArray) {
    if (formArray.controls.length === 0) {
      formArray.markAsDirty();
      return;
    }

    formArray.controls.forEach((control) => {
      switch (control.constructor.name) {
        case 'FormGroup':
          this.markGroupDirty(control as FormGroup);
          break;
        case 'FormArray':
          this.markArrayDirty(control as FormArray);
          break;
        case 'FormControl':
          this.markControlDirty(control as FormControl);
          break;
      }
    });
  }

  private markControlDirty(formControl: FormControl) {
    formControl.markAsDirty();
  }
}
