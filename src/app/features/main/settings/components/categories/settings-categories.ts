import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModal } from '../category-modal/category-modal';
import { CategoryService } from '@app/core/services/category.service';
import { Category } from '@app/core/models/category.model';

@Component({
  selector: 'app-settings-categories',
  standalone: true,
  imports: [CommonModule, CategoryModal],
  templateUrl: './settings-categories.html',
  styleUrl: './settings-categories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsCategories {
  private readonly categoryService = inject(CategoryService);
  private readonly modal = viewChild.required(CategoryModal);

  protected readonly expenseCategories = this.categoryService.getExpenseCategories;
  protected readonly incomeCategories = this.categoryService.getIncomeCategories;

  openAddModal(): void {
    this.modal().open();
  }

  openEditModal(category: Category): void {
    this.modal().open(category);
  }

  deleteCategory(id: string): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id);
    }
  }

  trackById(_: number, item: Category): string {
    return item.id;
  }
}
