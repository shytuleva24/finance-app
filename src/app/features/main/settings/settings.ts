import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SettingsCategories } from '@app/features/main/settings/components/categories/settings-categories';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [SettingsCategories],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Settings {}
