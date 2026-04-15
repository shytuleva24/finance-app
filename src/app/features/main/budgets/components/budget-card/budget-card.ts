import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CategoryService } from '@app/core/services/category.service';
import { Budget, BudgetView } from '@app/core/models/budget.model';

@Component({
  selector: 'app-budget-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './budget-card.html',
  styleUrl: './budget-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetCard {
  private readonly categoryService = inject(CategoryService);

  budget = input.required<BudgetView>();
  edit = output<Budget>();
  delete = output<string>();

  category = computed(() => this.categoryService.getCategoryById(this.budget().categoryId));

  progressWidth = computed(() => {
    const percentage = (this.budget().spent / this.budget().limit) * 100;
    return `${Math.min(100, percentage)}%`;
  });

  onEdit(): void {
    this.edit.emit(this.budget());
  }

  onDelete(): void {
    if (confirm('Are you sure you want to delete this budget?')) {
      this.delete.emit(this.budget().id);
    }
  }
}
