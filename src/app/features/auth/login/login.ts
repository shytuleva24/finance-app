import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '@app/features/auth/auth.facade';
import { emailValidations, passwordValidations } from '@app/core/constants/form.constants';
import { PasswordInput } from '@app/shared/form/password-input/password-input';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { TextInputComponent } from '@app/shared/form/text-input/text-input';
import { createFormState } from '@app/shared/utils/form-state.util';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, TextInputComponent, PasswordInput, PrimaryButton],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private readonly authFacade = inject(AuthFacade);

  protected readonly emailValidations = emailValidations;
  protected readonly passwordValidations = passwordValidations;

  protected readonly form = createFormState(
    {
      email: '',
      password: '',
    },
    {
      email: this.emailValidations,
      password: this.passwordValidations,
    },
  );

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!this.form.isValid()) return;

    this.form.submit(this.authFacade.login(this.form.data()));
  }
}
