import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';
import { ConfirmActionDialog } from '@app/shared/components/confirm-action-dialog/confirm-action-dialog';
import { CategoriesList } from '@app/features/main/settings/components/categories/categories-list/categories-list';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [ConfirmActionDialog, CategoriesList],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly userName = this.auth.userName;
  protected readonly isLogoutModalOpen = signal(false);

  protected openLogoutModal(): void {
    this.isLogoutModalOpen.set(true);
  }

  protected closeLogoutModal(): void {
    this.isLogoutModalOpen.set(false);
  }

  protected confirmLogout(): void {
    this.closeLogoutModal();
    this.router.navigate(['/auth/login']).then();
    this.auth.logout();
  }
}
