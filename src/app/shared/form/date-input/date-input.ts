import { Component, OnInit } from '@angular/core';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-date-input',
  standalone: true,
  templateUrl: './date-input.html',
  styleUrl: './date-input.scss',
})
export class DateInputComponent extends BaseFormField implements OnInit {
  ngOnInit() {
    if (!this.value() && !this.internalValue()) {
      const today = new Date().toISOString().split('T')[0];
      this.internalValue.set(today);
      this.valueChange.emit(today);
    }
  }
}
