import { computed, inject, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { FormValidationService, ValidationRules } from '@app/core/services/form-validation.service';

export type FormFields = Record<string, string>;
export type FieldErrors<T extends FormFields> = Record<keyof T, string | null>;
export type FormValidations<T extends FormFields> = Record<keyof T, ValidationRules>;

export class FormState<T extends FormFields> {
  private readonly validator = inject(FormValidationService);

  readonly data: WritableSignal<T>;
  readonly errors: WritableSignal<FieldErrors<T>>;
  readonly isSubmitting = signal(false);
  readonly globalError = signal<string | null>(null);

  readonly isValid = computed(() => {
    return Object.keys(this.data()).every((key) => {
      const value = this.data()[key as keyof T];
      const rules = this.validations[key as keyof T] || {};
      return this.validator.validate(value, rules) === null;
    });
  });

  constructor(
    initialData: T,
    private readonly validations: FormValidations<T> = {} as FormValidations<T>,
  ) {
    this.data = signal(initialData);

    const initialErrors = {} as FieldErrors<T>;
    Object.keys(initialData).forEach((key) => {
      initialErrors[key as keyof T] = null;
    });
    this.errors = signal(initialErrors);
  }

  updateField(field: keyof T, value: string) {
    this.data.update((v) => ({ ...v, [field]: value }));
    this.clearFieldError(field);
  }

  clearFieldError(field: keyof T) {
    this.errors.update((errs) => ({ ...errs, [field]: null }));
    this.globalError.set(null);
  }

  setSubmitting(value: boolean) {
    this.isSubmitting.set(value);
  }

  setGlobalError(message: string | null) {
    this.globalError.set(message);
  }

  submit(request$: Observable<unknown>): void {
    if (this.isSubmitting()) return;

    this.setSubmitting(true);
    request$.subscribe({
      next: () => this.setSubmitting(false),
      error: (err) => {
        this.setGlobalError(err.message || 'An unexpected error occurred');
        this.setSubmitting(false);
      },
    });
  }
}

export function createFormState<T extends FormFields>(
  initialData: T,
  validations: FormValidations<T> = {} as FormValidations<T>,
) {
  return new FormState<T>(initialData, validations);
}
