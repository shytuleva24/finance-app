import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackbarService } from '@app/core/services/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="snackbar-container">
      @for (msg of messages(); track msg.id) {
        <div class="snackbar-item" [class]="'snackbar-item--' + msg.type">
          <span class="message">{{ msg.message }}</span>
          <button class="close-btn" (click)="remove(msg.id)">×</button>
        </div>
      }
    </div>
  `,
  styles: `
    .snackbar-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      pointer-events: none;
    }

    .snackbar-item {
      pointer-events: auto;
      padding: 12px 20px;
      border-radius: 8px;
      background-color: #333;
      color: white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 280px;
      max-width: 450px;
      animation: slide-in 0.3s ease-out;

      &--error {
        background-color: #c94736;
      }
      &--success {
        background-color: #277c78;
      }
      &--info {
        background-color: #626070;
      }
    }

    .message {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
    }

    .close-btn {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
      padding: 0;
      line-height: 1;
      opacity: 0.7;
      transition: opacity 0.2s;

      &:hover {
        opacity: 1;
      }
    }

    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  private readonly snackbarService = inject(SnackbarService);
  readonly messages = this.snackbarService.messages;

  remove(id: number) {
    this.snackbarService.remove(id);
  }
}
