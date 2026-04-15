import { Component, computed, input, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { BaseFormField } from '../base-form-field';

@Component({
  selector: 'app-password-input',
  standalone: true,
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  imports: [NgOptimizedImage],
})
export class PasswordInput extends BaseFormField {
  readonly autocomplete = input<string>('current-password');

  readonly showPassword = signal(false);

  readonly type = computed(() => (this.showPassword() ? 'text' : 'password'));

  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }
}
