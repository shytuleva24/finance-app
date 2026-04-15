import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { BudgetModal } from '@app/features/main/budgets/components/budget-modal/budget-modal';
import { Budget } from '@app/core/models/budget.model';
import { BudgetSummary } from '@app/features/main/budgets/components/budget-summary/budget-summary';
import { BudgetCard } from '@app/features/main/budgets/components/budget-card/budget-card';
import { BudgetService } from '@app/core/services/budget.service';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';

@Component({
  selector: 'app-budgets',
  standalone: true,
  imports: [BudgetSummary, BudgetModal, BudgetCard, PrimaryButton],
  templateUrl: './budgets.html',
  styleUrl: './budgets.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Budgets {
  protected readonly budgetService = inject(BudgetService);
  private readonly modal = viewChild.required(BudgetModal);

  openAddModal(): void {
    this.modal().open();
  }

  openEditModal(budget: Budget): void {
    this.modal().open(budget);
  }
}
