import { computed, Injectable, signal } from '@angular/core';
import { Transaction } from '../models/transaction.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private readonly transactions = signal<Transaction[]>(this.getInitialTransactions());

  readonly allTransactions = this.transactions.asReadonly();

  readonly totalIncome = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  readonly totalExpenses = computed(() =>
    this.transactions()
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0),
  );

  readonly balance = computed(() => this.totalIncome() - this.totalExpenses());

  addTransaction(transaction: Transaction): void {
    this.transactions.update((prev) => [transaction, ...prev]);
  }

  deleteTransaction(id: string): void {
    this.transactions.update((prev) => prev.filter((t) => t.id !== id));
  }

  private getInitialTransactions(): Transaction[] {
    // Here we can put some mock data for demo
    return [];
  }
}
