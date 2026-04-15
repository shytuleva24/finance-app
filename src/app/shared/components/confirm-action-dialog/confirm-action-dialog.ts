import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Modal } from '@app/shared/components/modal/modal';

type ConfirmActionVariant = 'danger' | 'primary';

@Component({
  selector: 'app-confirm-action-dialog',
  standalone: true,
  imports: [Modal],
  templateUrl: './confirm-action-dialog.html',
  styleUrl: './confirm-action-dialog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmActionDialog {
  /**
   * Whether the dialog is open.
   */
  readonly isOpen = input<boolean>(false);

  /**
   * The dialog title.
   */
  readonly title = input.required<string>();

  /**
   * Description shown below the title.
   */
  readonly description = input.required<string>();

  /**
   * Label for the main action button.
   */
  readonly confirmText = input<string>('Confirm');

  /**
   * Label for the secondary action button.
   */
  readonly cancelText = input<string>('Cancel');

  /**
   * Visual variant of the main action button.
   */
  readonly confirmVariant = input<ConfirmActionVariant>('danger');

  /**
   * Emitted when dialog is closed without confirmation.
   */
  readonly closed = output<void>();

  /**
   * Emitted when user confirms the action.
   */
  readonly confirmed = output<void>();

  /**
   * Handles the primary confirmation action.
   */
  confirm(): void {
    this.confirmed.emit();
    this.close();
  }

  /**
   * Handles dialog close/cancel.
   */
  close(): void {
    this.closed.emit();
  }
}
