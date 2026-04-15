import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { MAX_TEXT_LENGTH } from '@app/core/constants/form.constants';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, PrimaryButton],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly MAX_TEXT_LENGTH = MAX_TEXT_LENGTH;

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(MAX_TEXT_LENGTH)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        Validators.maxLength(MAX_TEXT_LENGTH),
      ],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(MAX_TEXT_LENGTH),
      ],
    }),
  });

  onSubmit() {
    this.errorMessage.set(null);

    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      return;
    }

    this.isSubmitting.set(true);

    const { name, email, password } = this.form.getRawValue();

    this.auth.register({ name, email, password }).subscribe({
      next: async () => {
        await this.router.navigate(['/overview']);
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('Registration error:', err);
        const errorMessage =
          err.error?.detailMessage ||
          err.error?.message ||
          'Registration failed. Please try again.';
        this.errorMessage.set(errorMessage);
        this.isSubmitting.set(false);
      },
    });
  }
}
