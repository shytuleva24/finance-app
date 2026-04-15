import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@app/core/auth/auth.service';
import { MAX_TEXT_LENGTH } from '@app/core/constants/form.constants';
import { PasswordInput } from '@app/shared/form/password-input/password-input';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { TextInputComponent } from '@app/shared/form/text-input/text-input';
import { form, maxLength, pattern, required } from '@angular/forms/signals';

interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, TextInputComponent, PasswordInput, PrimaryButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal<string | null>(null);
  readonly MAX_TEXT_LENGTH = MAX_TEXT_LENGTH;
  readonly loginData = signal<LoginForm>({
    email: '',
    password: '',
  });
  readonly form = form(this.loginData, (root) => {
    required(root.email, { message: 'Email is required' });
    pattern(root.email, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: 'Please enter a valid email address',
    });
    maxLength(root.email, this.MAX_TEXT_LENGTH);

    required(root.password, { message: 'Password is required' });
    maxLength(root.password, this.MAX_TEXT_LENGTH);
  });

  updateEmail(value: string) {
    this.loginData.update((v) => ({
      ...v,
      email: value,
    }));
  }

  updatePassword(value: string) {
    this.loginData.update((v) => ({
      ...v,
      password: value,
    }));
  }

  async onSubmit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    this.errorMessage.set(null);

    if (this.form().invalid() || this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);

    const { email, password } = this.form().value();

    this.auth
      .login({
        email: email.trim().toLowerCase(),
        password: password.trim(),
      })
      .subscribe({
        next: async () => {
          await this.router.navigate(['/overview']);
          this.isSubmitting.set(false);
        },
        error: (err) => {
          const message =
            err.error?.detailMessage ||
            err.error?.message ||
            'Invalid credentials or server error.';
          this.errorMessage.set(message);
          this.isSubmitting.set(false);
        },
      });
  }
}
