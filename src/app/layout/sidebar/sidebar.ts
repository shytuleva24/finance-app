import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { SIDEBAR_NAV_ITEMS } from '@app/core/constants/navigation.constants';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  protected readonly isCollapsed = signal(false);
  protected readonly navItems = SIDEBAR_NAV_ITEMS;

  toggleSidebar(): void {
    this.isCollapsed.update((val) => !val);
  }
}
