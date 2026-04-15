import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CategoryService } from '@app/core/services/category.service';
import { BudgetService } from '@app/core/services/budget.service';

@Component({
  selector: 'app-budget-summary',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './budget-summary.html',
  styleUrl: './budget-summary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetSummary {
  private readonly categoryService = inject(CategoryService);
  protected readonly budgetService = inject(BudgetService);

  /**
   * Generates the conic-gradient string for the donut chart.
   */
  chartGradient = computed(() => {
    const budgets = this.budgetService.budgetViews();
    const total = this.budgetService.totalBudgeted();

    if (total === 0) return 'var(--beige-100)';

    let currentPercentage = 0;
    const segments = budgets.map((b) => {
      const start = currentPercentage;
      const percentage = (b.limit / total) * 100;
      currentPercentage += percentage;
      return `${b.theme} ${start}% ${currentPercentage}%`;
    });

    return `conic-gradient(${segments.join(', ')})`;
  });

  getCategoryName(categoryId: string): string {
    return this.categoryService.getCategoryById(categoryId)?.name ?? 'Other';
  }
}
