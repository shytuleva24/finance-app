import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionType } from '@app/core/models/transaction.model';

@Component({
  selector: 'app-type-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './type-selector.html',
  styleUrl: './type-selector.scss',
})
export class TypeSelectorComponent {
  readonly label = input<string>('Type');
  readonly value = input.required<TransactionType>();
  readonly name = input<string>('type');
  readonly valueChange = output<TransactionType>();

  onTypeChange(type: TransactionType) {
    this.valueChange.emit(type);
  }
}
