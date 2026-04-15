import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '@app/layout/sidebar/sidebar';
import { BrowserService } from '@app/core/services/browser.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Main {
  private readonly browser = inject(BrowserService);
  readonly isBrowser = this.browser.isBrowser;
}
