import { Component, computed, input, output, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-password-input',
  standalone: true,
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  imports: [NgOptimizedImage],
})
export class PasswordInput {
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly autocomplete = input<string>('current-password');
  readonly inputId = input.required<string>();
  readonly maxLength = input<number>(100);

  readonly value = input<string>('');
  readonly error = input<string | null>(null);
  readonly touched = input<boolean>(false);

  readonly valueChange = output<string>();

  readonly showPassword = signal(false);
  readonly isFocused = signal(false);

  readonly type = computed(() => (this.showPassword() ? 'text' : 'password'));

  readonly hasError = computed(() => {
    return !!(this.error() && this.touched() && !this.isFocused());
  });

  togglePasswordVisibility() {
    this.showPassword.update((v) => !v);
  }

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onFocus() {
    this.isFocused.set(true);
  }

  onBlur() {
    this.isFocused.set(false);
  }
}
