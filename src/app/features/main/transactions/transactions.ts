import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TransactionModal } from '@app/features/main/transactions/components/transaction-modal/transaction-modal';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { TransactionFacade } from './transaction.facade';
import { SelectInputComponent, SelectOption } from '@app/shared/form/select-input/select-input';
import { ConfirmActionDialog } from '@app/shared/components/confirm-action-dialog/confirm-action-dialog';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    TransactionModal,
    CommonModule,
    PrimaryButton,
    SelectInputComponent,
    ConfirmActionDialog,
  ],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Transactions {
  protected readonly facade = inject(TransactionFacade);

  protected readonly categoryOptions = computed<SelectOption[]>(() => {
    if (this.facade.categories().length === 0) return [];
    return [
      { label: 'All Categories', value: 'null' },
      ...this.facade.categories().map((cat) => ({
        label: cat.name,
        value: String(cat.id),
      })),
    ];
  });

  onDeleteTransaction(id: number): void {
    this.facade.deleteTransaction(id);
  }

  onConfirmDelete(): void {
    this.facade.confirmDelete();
  }

  closeDeleteModal(): void {
    this.facade.closeDeleteModal();
  }

  onCategoryFilterChange(value: string): void {
    const id = value === 'null' ? null : Number(value);
    this.facade.setFilterCategory(id);
  }

  protected readonly String = String;
}
