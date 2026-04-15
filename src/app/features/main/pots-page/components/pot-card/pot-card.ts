import { ChangeDetectionStrategy, Component, input, output, computed, signal } from '@angular/core';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Pot } from '@app/core/models/pot.model';

@Component({
  selector: 'app-pot-card',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe],
  templateUrl: './pot-card.html',
  styleUrl: './pot-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PotCard {
  /**
   * The pot data to display.
   */
  readonly pot = input.required<Pot>();

  /**
   * Emitted when user wants to edit the pot.
   */
  readonly edit = output<void>();

  /**
   * Emitted when user wants to delete the pot.
   */
  readonly delete = output<void>();

  /**
   * Emitted when user wants to add money.
   */
  readonly addMoney = output<void>();

  /**
   * Emitted when user wants to withdraw money.
   */
  readonly withdraw = output<void>();

  /**
   * Whether the menu is open.
   */
  readonly isMenuOpen = signal(false);

  /**
   * Calculates the percentage of the target reached.
   */
  readonly percentage = computed(() => {
    const p = this.pot();
    return Math.min(1, p.total / p.target);
  });

  /**
   * Returns the color variable based on the theme.
   */
  readonly themeColor = computed(() => {
    const theme = this.pot().theme;
    return `var(--${theme.toLowerCase().replace(' ', '-')})`;
  });

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  handleEdit(): void {
    this.edit.emit();
    this.isMenuOpen.set(false);
  }

  handleDelete(): void {
    this.delete.emit();
    this.isMenuOpen.set(false);
  }
}
