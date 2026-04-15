import { Component, computed, inject, input, output, signal } from '@angular/core';
import { FormValidationService, ValidationRules } from '@app/core/services/form-validation.service';

@Component({
  selector: 'app-text-input',
  standalone: true,
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInputComponent {
  private readonly validator = inject(FormValidationService);

  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly autocomplete = input<string>('');
  readonly inputId = input.required<string>();
  readonly maxLength = input<number>(100);

  readonly value = input<string>('');
  readonly serverError = input<string | null>(null);
  readonly validations = input<ValidationRules>({});

  readonly valueChange = output<string>();

  private readonly touched = signal(false);
  readonly isFocused = signal(false);

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

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onBlur() {
    this.isFocused.set(false);
    this.touched.set(true);
  }

  onFocus() {
    this.isFocused.set(true);
  }
}
