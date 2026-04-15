import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthFacade } from '@app/features/auth/auth.facade';
import {
  emailValidations,
  nameValidations,
  passwordValidations,
} from '@app/core/constants/form.constants';
import { PasswordInput } from '@app/shared/form/password-input/password-input';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { TextInputComponent } from '@app/shared/form/text-input/text-input';
import { createFormState } from '@app/shared/utils/form-state.util';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, TextInputComponent, PasswordInput, PrimaryButton],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  private readonly authFacade = inject(AuthFacade);

  protected readonly nameValidations = nameValidations;
  protected readonly emailValidations = emailValidations;
  protected readonly passwordValidations = passwordValidations;

  protected readonly form = createFormState(
    {
      name: '',
      email: '',
      password: '',
    },
    {
      name: this.nameValidations,
      email: this.emailValidations,
      password: this.passwordValidations,
    },
  );

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    if (!this.form.isValid()) return;

    this.form.submit(this.authFacade.register(this.form.data()));
  }
}
