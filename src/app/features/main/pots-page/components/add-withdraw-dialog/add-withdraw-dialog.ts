import { ChangeDetectionStrategy, Component, input, output, inject, computed } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CurrencyPipe, PercentPipe } from '@angular/common';
import { Pot } from '@app/core/models/pot.model';
import { Modal } from '@app/shared/components/modal/modal';

@Component({
  selector: 'app-add-withdraw-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, Modal, CurrencyPipe, PercentPipe],
  templateUrl: './add-withdraw-dialog.html',
  styleUrl: './add-withdraw-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWithdrawDialog {
  private readonly fb = inject(NonNullableFormBuilder);

  /**
   * Whether the dialog is open.
   */
  readonly isOpen = input<boolean>(false);

  /**
   * The pot to add to or withdraw from.
   */
  readonly pot = input.required<Pot>();

  /**
   * Mode: 'add' or 'withdraw'.
   */
  readonly mode = input.required<'add' | 'withdraw'>();

  /**
   * Emitted when the dialog is closed.
   */
  readonly closed = output<void>();

  /**
   * Emitted when an amount is confirmed.
   */
  readonly confirmed = output<number>();

  /**
   * The form for adding/withdrawing money.
   */
  readonly form = this.fb.group({
    amount: [0, [Validators.required, Validators.min(0.01)]],
  });

  /**
   * New total after add/withdraw.
   */
  readonly newTotal = computed(() => {
    const current = this.pot().total;
    const amount = this.form.get('amount')?.value || 0;
    return this.mode() === 'add' ? current + amount : Math.max(0, current - amount);
  });

  /**
   * New percentage after add/withdraw.
   */
  readonly newPercentage = computed(() => {
    return Math.min(1, this.newTotal() / this.pot().target);
  });

  /**
   * Theme color for the progress bar.
   */
  readonly themeColor = computed(() => {
    return `var(--${this.pot().theme.toLowerCase().replace(' ', '-')})`;
  });

  onSubmit(): void {
    if (this.form.valid) {
      this.confirmed.emit(this.form.getRawValue().amount);
      this.form.reset({ amount: 0 });
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }
}
