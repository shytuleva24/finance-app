import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModal } from '../category-modal/category-modal';
import { CategoryService } from '@app/core/services/category.service';
import { Category } from '@app/core/models/category.model';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { ConfirmActionDialog } from '@app/shared/components/confirm-action-dialog/confirm-action-dialog';

@Component({
  selector: 'app-settings-categories',
  standalone: true,
  imports: [CommonModule, CategoryModal, PrimaryButton, ConfirmActionDialog],
  templateUrl: './settings-categories.html',
  styleUrl: './settings-categories.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsCategories {
  private readonly categoryService = inject(CategoryService);
  private readonly modal = viewChild.required(CategoryModal);

  protected readonly categories = this.categoryService.getCategories();
  protected readonly loading = this.categoryService.loading;
  protected readonly error = this.categoryService.error;

  protected readonly isDeleteModalOpen = signal(false);
  protected readonly categoryToDelete = signal<number | null>(null);

  protected readonly categoryToDeleteName = computed(() => {
    const id = this.categoryToDelete();
    return id !== null ? this.categoryService.getCategoryById(id)?.name : null;
  });

  protected readonly expenseCategories = computed(() => {
    return this.categories().filter((c) => c.type === 'OUTCOME');
  });

  protected readonly incomeCategories = computed(() => {
    return this.categories().filter((c) => c.type === 'INCOME');
  });

  openAddModal(): void {
    this.modal().open();
  }

  openEditModal(category: Category): void {
    this.modal().open(category);
  }

  deleteCategory(id: number): void {
    this.categoryToDelete.set(id);
    this.isDeleteModalOpen.set(true);
  }

  onConfirmDelete(): void {
    const id = this.categoryToDelete();
    if (id !== null) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.closeDeleteModal(),
      });
    }
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen.set(false);
    this.categoryToDelete.set(null);
  }
}
