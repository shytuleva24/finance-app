import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-text-input',
  standalone: true,
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInputComponent {
  readonly label = input.required<string>();
  readonly placeholder = input<string>('');
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly autocomplete = input<string>('');
  readonly inputId = input.required<string>();
  readonly maxLength = input<number>(100);

  readonly value = input<string>('');
  readonly error = input<string | null>(null);
  readonly touched = input<boolean>(false);

  readonly valueChange = output<string>();

  readonly isFocused = signal(false);

  readonly hasError = computed(() => {
    return !!(this.error() && !this.isFocused());
  });

  onInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.valueChange.emit(value);
  }

  onBlur() {
    this.isFocused.set(false);
  }

  onFocus() {
    this.isFocused.set(true);
  }
}
