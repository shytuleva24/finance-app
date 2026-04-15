import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { TransactionModal } from '@app/features/main/transactions/components/transaction-modal/transaction-modal';
import { CategoryService } from '@app/core/services/category.service';
import { TransactionService } from '@app/core/services/transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionModal, CommonModule],
  templateUrl: './transactions.html',
  styleUrl: './transactions.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Transactions {
  private readonly categoryService = inject(CategoryService);
  private readonly transactionService = inject(TransactionService);

  private readonly modal = viewChild.required(TransactionModal);

  readonly transactions = this.transactionService.allTransactions;

  getCategoryName(id: string): string {
    return this.categoryService.getCategoryById(id)?.name ?? 'Other';
  }

  getCategoryColor(id: string): string {
    return this.categoryService.getCategoryById(id)?.color ?? '#696868';
  }

  openAddModal(): void {
    this.modal().open();
  }
}
