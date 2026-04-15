import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthLayout } from '@app/layout/auth-layout/auth-layout';
import { BrowserService } from '@app/core/services/browser.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, AuthLayout],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Auth {
  private readonly browser = inject(BrowserService);
  readonly isBrowser = this.browser.isBrowser;
}
