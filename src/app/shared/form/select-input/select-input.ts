import { Component, input } from '@angular/core';
import { BaseFormField } from '../base-form-field';

export interface SelectOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-select-input',
  standalone: true,
  templateUrl: './select-input.html',
  styleUrl: './select-input.scss',
})
export class SelectInputComponent extends BaseFormField {
  readonly options = input<SelectOption[]>([]);
  readonly emptyLabel = input<string>('Select an option');

  onSelectChange(event: Event) {
    if (this.disabled() || this.readonly()) return;
    const value = (event.target as HTMLSelectElement).value;
    this.internalValue.set(value);
    this.valueChange.emit(value);
  }
}
