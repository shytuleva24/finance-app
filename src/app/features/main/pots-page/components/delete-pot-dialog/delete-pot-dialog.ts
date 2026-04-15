import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Modal } from '@app/shared/components/modal/modal';
import { Pot } from '@app/core/models/pot.model';

@Component({
  selector: 'app-delete-pot-dialog',
  standalone: true,
  imports: [Modal],
  templateUrl: './delete-pot-dialog.html',
  styleUrl: './delete-pot-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePotDialog {
  /**
   * Whether the dialog is open.
   */
  readonly isOpen = input<boolean>(false);

  /**
   * The pot to delete.
   */
  readonly pot = input.required<Pot>();

  /**
   * Emitted when the dialog is closed.
   */
  readonly closed = output<void>();

  /**
   * Emitted when deletion is confirmed.
   */
  readonly confirmed = output<void>();

  confirm(): void {
    this.confirmed.emit();
    this.close();
  }

  close(): void {
    this.closed.emit();
  }
}
