import { Directive, computed, inject, input, output, signal } from '@angular/core';
import { FormValidationService, ValidationRules } from '@app/core/services/form-validation.service';

export type ShowErrorMode = 'blur' | 'always' | 'submit';

@Directive()
export abstract class BaseFormField {
  protected readonly validator = inject(FormValidationService);

  // Inputs
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly inputId = input.required<string>();
  readonly maxLength = input<number>(100);
  readonly disabled = input<boolean>(false);
  readonly readonly = input<boolean>(false);
  readonly showErrorMode = input<ShowErrorMode>('blur');

  readonly value = input<string>('');
  readonly serverError = input<string | null>(null);
  readonly validations = input<ValidationRules>({});
  readonly normalize = input<(value: string) => string>((v) => v);

  // Outputs
  readonly valueChange = output<string>();

  // Internal State
  protected readonly internalValue = signal<string | null>(null);
  readonly touched = signal(false);
  readonly isFocused = signal(false);
  readonly isSubmitted = signal(false);

  // Computed
  readonly currentValue = computed(() => {
    const controlledValue = this.value();
    const uncontrolledValue = this.internalValue();
    return uncontrolledValue !== null ? uncontrolledValue : controlledValue;
  });

  readonly validationError = computed(() => {
    return this.validator.validate(this.currentValue() || '', this.validations());
  });

  readonly error = computed(() => {
    if (this.serverError()) {
      return this.serverError();
    }

    const mode = this.showErrorMode();
    const shouldShow =
      mode === 'always' ||
      (mode === 'blur' && this.touched() && !this.isFocused()) ||
      (mode === 'submit' && this.isSubmitted());

    return shouldShow ? this.validationError() : null;
  });

  readonly hasError = computed(() => !!this.error());

  readonly ariaDescribedBy = computed(() => {
    return this.hasError() ? `${this.inputId()}-error` : undefined;
  });

  onInput(event: Event) {
    if (this.disabled() || this.readonly()) return;

    let newValue = (event.target as HTMLInputElement).value;
    newValue = this.normalize()(newValue);

    this.internalValue.set(newValue);
    this.valueChange.emit(newValue);
  }

  onFocus() {
    this.isFocused.set(true);
  }

  onBlur() {
    this.isFocused.set(false);
    this.touched.set(true);
  }
}
