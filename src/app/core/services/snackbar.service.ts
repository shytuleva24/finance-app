import { Injectable, signal } from '@angular/core';

export interface SnackbarMessage {
  message: string;
  type: 'error' | 'success' | 'info';
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly _messages = signal<SnackbarMessage[]>([]);
  readonly messages = this._messages.asReadonly();

  show(message: string, type: 'error' | 'success' | 'info' = 'info', duration = 5000) {
    const id = Date.now();
    this._messages.update((msgs) => [...msgs, { message, type, id }]);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }
  }

  remove(id: number) {
    this._messages.update((msgs) => msgs.filter((m) => m.id !== id));
  }
}
