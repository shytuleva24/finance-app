import { ChangeDetectionStrategy, Component, computed, inject, viewChild } from '@angular/core';
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

  protected readonly categories = this.categoryService.getCategories();

  protected readonly expenseCategories = computed(() => {
    if (!this.categories.hasValue()) return [];
    return this.categories.value().filter((c) => c.type === 'OUTCOME');
  });

  protected readonly incomeCategories = computed(() => {
    if (!this.categories.hasValue()) return [];
    return this.categories.value().filter((c) => c.type === 'INCOME');
  });

  openAddModal(): void {
    this.modal().open();
  }

  openEditModal(category: Category): void {
    this.modal().open(category);
  }

  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id);
    }
  }
}
