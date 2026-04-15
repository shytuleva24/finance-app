import { ChangeDetectionStrategy, Component, input, output, inject, effect } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '@app/shared/components/modal/modal';
import { Pot, PotTheme } from '@app/core/models/pot.model';
import { CurrencyCode } from '@app/core/models/fx-rate.model';

@Component({
  selector: 'app-pot-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, Modal],
  templateUrl: './pot-dialog.html',
  styleUrl: './pot-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PotDialog {
  private readonly fb = inject(NonNullableFormBuilder);

  /**
   * Whether the dialog is open.
   */
  readonly isOpen = input<boolean>(false);

  /**
   * The pot to edit (optional). If provided, the dialog is in "Edit" mode.
   */
  readonly pot = input<Pot | null>(null);

  /**
   * Emitted when the dialog is closed.
   */
  readonly closed = output<void>();

  /**
   * Emitted when a pot is saved.
   */
  readonly saved = output<Omit<Pot, 'id'>>();

  /**
   * The form for adding/editing a pot.
   */
  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(30)]],
    target: [0, [Validators.required, Validators.min(1)]],
    theme: ['Green' as PotTheme, [Validators.required]],
    currency: ['USD' as CurrencyCode, [Validators.required]],
  });

  readonly themes: PotTheme[] = [
    'Green',
    'Yellow',
    'Cyan',
    'Navy',
    'Red',
    'Purple',
    'Turquoise',
    'Brown',
    'Magenta',
    'Blue',
    'Grey',
    'Army Green',
    'Gold',
    'Orange',
  ];

  constructor() {
    effect(() => {
      const pot = this.pot();
      if (pot) {
        this.form.patchValue({
          name: pot.name,
          target: pot.target,
          theme: pot.theme,
          currency: pot.currency,
        });
      } else {
        this.form.reset({
          name: '',
          target: 0,
          theme: 'Green',
          currency: 'USD',
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formValue = this.form.getRawValue();
      this.saved.emit({
        ...formValue,
        total: this.pot()?.total ?? 0,
      });
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }
}
