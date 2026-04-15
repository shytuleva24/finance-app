import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { PasswordInput } from '@app/shared/form/password-input/password-input';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { TextInputComponent } from '@app/shared/form/text-input/text-input';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TextInputComponent, PasswordInput, PrimaryButton],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.group({
    name: ['', [Validators.required]],
    email: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  onSubmit() {
    this.errorMessage.set(null);

    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const { name, email, password } = this.form.getRawValue();

    this.auth
      .register({ name: name ?? undefined, email: email ?? '', password: password ?? '' })
      .subscribe({
        next: async () => {
          await this.router.navigate(['/overview']);
          this.isSubmitting.set(false);
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.errorMessage.set(err.error?.message || 'Registration failed. Please try again.');
          this.isSubmitting.set(false);
        },
      });
  }
}
