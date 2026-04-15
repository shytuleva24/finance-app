import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Modal } from '@app/shared/components/modal/modal';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { CategoryService } from '@app/core/services/category.service';
import { Budget } from '@app/core/models/budget.model';

@Component({
  selector: 'app-budget-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Modal, PrimaryButton],
  templateUrl: './budget-modal.html',
  styleUrl: './budget-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetModal {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);

  isOpen = signal(false);
  isEditMode = signal(false);
  editingBudgetId = signal<string | null>(null);

  readonly currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'PLN', symbol: 'zł' },
  ];

  form = this.fb.nonNullable.group({
    type: this.fb.nonNullable.control<'expense' | 'income'>('expense'),
    categoryId: this.fb.nonNullable.control('', [Validators.required]),
    limit: this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.01)]),
    currency: this.fb.nonNullable.control('USD', [Validators.required]),
    description: this.fb.nonNullable.control(''),
  });

  /**
   * Filter categories based on the selected budget type (expense/income).
   */
  filteredCategories = computed(() => {
    const type = this.form.get('type')?.value;
    return type === 'income'
      ? this.categoryService.getIncomeCategories()
      : this.categoryService.getExpenseCategories();
  });

  /**
   * Filter out categories that already have budgets (only in Add mode).
   */
  // availableCategories = computed(() => {
  //   const existingBudgetCategoryIds = this.budgetStore
  //     .budgets()
  //     .map((b) => b.categoryId);
  //   const categories = this.filteredCategories();
  //
  //   if (this.isEditMode()) {
  //     return categories;
  //   }
  //
  //   return categories.filter((c) => !existingBudgetCategoryIds.includes(c.id));
  // });

  open(budget?: Budget): void {
    if (budget) {
      this.isEditMode.set(true);
      this.editingBudgetId.set(budget.id);
      this.form.patchValue({
        type: budget.type || 'expense',
        categoryId: budget.categoryId,
        limit: budget.limit,
        currency: budget.currency,
        description: budget.description || '',
      });
      this.form.controls.type.disable();
      this.form.controls.categoryId.disable();
    } else {
      this.isEditMode.set(false);
      this.editingBudgetId.set(null);
      this.form.reset({
        type: 'expense',
        categoryId: '',
        limit: 0,
        currency: 'USD',
        description: '',
      });
      this.form.controls.type.enable();
      this.form.controls.categoryId.enable();
    }
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;

    const val = this.form.getRawValue();
    const budgetData: Omit<Budget, 'id'> & { id?: string } = {
      id: this.editingBudgetId() ?? undefined,
      type: val.type,
      categoryId: val.categoryId,
      limit: val.limit,
      currency: val.currency,
      description: val.description,
    };

    this.close();
  }
}
