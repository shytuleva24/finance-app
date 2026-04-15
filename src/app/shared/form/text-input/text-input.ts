import { Component, input } from '@angular/core';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-text-input',
  standalone: true,
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInputComponent extends BaseFormField {
  readonly type = input<'text' | 'email' | 'tel' | 'url' | 'password'>('text');
  readonly autocomplete = input<string>('off');
}
