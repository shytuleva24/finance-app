import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { merge, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent {
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly autocomplete = input<string>('');
  readonly inputId = input.required<string>();
  readonly control = input.required<FormControl<string | null>>();
  readonly errorMessages = input<Record<string, string>>({});

  private readonly controlState = toSignal(
    toObservable(this.control).pipe(
      switchMap((ctrl) => {
        if (!ctrl) return of(null);
        return merge(ctrl.valueChanges, ctrl.statusChanges);
      }),
    ),
  );

  readonly hasError = computed(() => {
    this.controlState();
    const ctrl = this.control();
    return ctrl.touched && ctrl.invalid;
  });

  readonly errorMessage = computed(() => {
    if (!this.hasError()) return '';

    const errors = this.control().errors;
    if (!errors) return '';

    const firstErrorKey = Object.keys(errors)[0];
    return this.errorMessages()[firstErrorKey] || this.getDefaultErrorMessage(firstErrorKey);
  });

  readonly ariaInvalid = computed(() => (this.hasError() ? 'true' : 'false'));

  readonly ariaDescribedBy = computed(() =>
    this.hasError() ? `${this.inputId()}-error` : undefined,
  );

  private getDefaultErrorMessage(key: string): string {
    const defaults: Record<string, string> = {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      pattern: 'Please enter a valid email address',
      minlength: 'This field is too short',
      maxlength: 'This field is too long',
    };
    return defaults[key] || 'Invalid value';
  }
}
