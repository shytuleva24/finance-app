import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  private readonly platformId = inject(PLATFORM_ID);

  /**
   * Title of the modal.
   */
  readonly title = input.required<string>();

  /**
   * Whether the modal is open.
   */
  readonly isOpen = input<boolean>(false);

  /**
   * Emitted when the modal is closed.
   */
  readonly closed = output<void>();

  private readonly dialog =
    viewChild<ElementRef<HTMLDialogElement>>('dialogRef');

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;

      const dialogEl = this.dialog()?.nativeElement;
      if (!dialogEl) return;

      if (this.isOpen()) {
        if (!dialogEl.open) {
          dialogEl.showModal();
          document.body.classList.add('modal-open');
        }
      } else {
        if (dialogEl.open) {
          dialogEl.close();
          document.body.classList.remove('modal-open');
        }
      }
    });
  }

  handleBackdropClick(event: MouseEvent): void {
    if (event.target === this.dialog()?.nativeElement) {
      this.close();
    }
  }

  close(): void {
    this.closed.emit();
  }
}
