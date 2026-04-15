import { computed, inject, Injectable, signal } from '@angular/core';
import { Budget, BudgetView } from '../models/budget.model';
import { TransactionService } from './transaction.service';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private readonly transactionService = inject(TransactionService);

  private readonly budgets = signal<Budget[]>(this.getInitialBudgets());

  readonly budgetViews = computed<BudgetView[]>(() => {
    const transactions = this.transactionService.allTransactions();
    return this.budgets().map((budget) => {
      const spent = transactions
        .filter((t) => t.categoryId === budget.categoryId && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        ...budget,
        spent,
        remaining: Math.max(0, budget.limit - spent),
        theme: '#696868',
      };
    });
  });

  readonly totalBudgeted = computed(() => this.budgets().reduce((sum, b) => sum + b.limit, 0));

  readonly totalSpent = computed(() => this.budgetViews().reduce((sum, b) => sum + b.spent, 0));

  deleteBudget(id: string): void {
    this.budgets.update((prev) => prev.filter((b) => b.id !== id));
  }

  private getInitialBudgets(): Budget[] {
    return [];
  }
}
