import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { PasswordInput } from '@app/shared/form/password-input/password-input';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { TextInputComponent } from '@app/shared/form/text-input/text-input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, TextInputComponent, PasswordInput, PrimaryButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly fb = inject(FormBuilder);
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);

  readonly form = this.fb.group({
    email: [
      '',
      [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)],
    ],
    password: ['', [Validators.required]],
  });

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  async onSubmit(): Promise<void> {
    this.errorMessage.set(null);

    if (this.form.invalid || this.isSubmitting()) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    const email = (this.form.get('email')?.value ?? '').trim().toLowerCase();
    const password = (this.form.get('password')?.value ?? '').trim();

    this.auth.login({ email, password }).subscribe({
      next: async () => {
        await this.router.navigate(['/overview']);
        this.isSubmitting.set(false);
      },
      error: (err) => {
        console.error('Login error:', err);
        console.log('Error details:', err);
        this.errorMessage.set(err.error?.message || 'Invalid credentials or server error.');
        this.isSubmitting.set(false);
      },
    });
  }
}
