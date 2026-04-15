import { Component, computed, inject, input, output, signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { FormValidationService, ValidationRules } from '@app/core/services/form-validation.service';

@Component({
  selector: 'app-password-input',
  standalone: true,
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  imports: [NgOptimizedImage],
})
export class PasswordInput {
  private readonly validator = inject(FormValidationService);

  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly autocomplete = input<string>('current-password');
  readonly inputId = input.required<string>();
  readonly maxLength = input<number>(100);

  readonly value = input<string>('');
  readonly serverError = input<string | null>(null);
  readonly validations = input<ValidationRules>({});

  readonly valueChange = output<string>();

  readonly showPassword = signal(false);
  private readonly touched = signal(false);
  readonly isFocused = signal(false);

  readonly type = computed(() => (this.showPassword() ? 'text' : 'password'));

  readonly error = computed(() => {
    if (this.serverError()) {
      return this.serverError();
    }

    if (!this.touched() || this.isFocused()) {
      return null;
    }

    return this.validator.validate(this.value(), this.validations());
  });

  readonly hasError = computed(() => !!this.error());

  readonly isValid = computed(() => {
    return this.validator.validate(this.value(), this.validations()) === null;
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
    this.touched.set(true);
  }
}
