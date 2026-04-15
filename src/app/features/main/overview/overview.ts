import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransactionService } from '@app/core/services/transaction.service';
import { BudgetService } from '@app/core/services/budget.service';
import { PotService } from '@app/core/services/pot.service';
import { BudgetSummary } from '../budgets/components/budget-summary/budget-summary';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, BudgetSummary],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  protected readonly transactionService = inject(TransactionService);
  protected readonly budgetService = inject(BudgetService);
  protected readonly potService = inject(PotService);

  readonly recentTransactions = computed(() =>
    this.transactionService.allTransactions().slice(0, 5),
  );
}
