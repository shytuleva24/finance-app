import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SettingsCategories } from '@app/features/main/settings/components/categories/settings-categories';
import { AuthService } from '@app/core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SettingsCategories],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected logout() {
    this.router.navigate(['/auth/login']).then();
    this.auth.logout();
  }
}
