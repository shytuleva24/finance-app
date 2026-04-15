import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { merge, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgOptimizedImage],
  templateUrl: './password-input.html',
  styleUrl: './password-input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInput {
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly autocomplete = input<string>('current-password');
  readonly inputId = input.required<string>();
  readonly control = input.required<FormControl<string | null>>();
  readonly errorMessages = input<Record<string, string>>({});

  readonly showPassword = signal(false);

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

  readonly type = computed(() => (this.showPassword() ? 'text' : 'password'));

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }
}
