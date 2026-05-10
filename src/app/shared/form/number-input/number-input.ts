import { Component } from '@angular/core';
import { BaseFormField } from '../base-form-field';
import { NgxMaskDirective } from 'ngx-mask';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [NgxMaskDirective, FormsModule],
  templateUrl: './number-input.html',
  styleUrl: './number-input.scss',
})
export class NumberInputComponent extends BaseFormField {
  onMaskedValueChange(value: string | number | null) {
    if (this.disabled() || this.readonly()) return;
    const stringValue = value === null || value === undefined ? '' : String(value);
    this.internalValue.set(stringValue);
    this.valueChange.emit(stringValue);
  }
}
