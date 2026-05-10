import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryModal } from '../category-modal/category-modal';
import { CategoryService } from '@app/core/services/category.service';
import { Category } from '@app/core/models/category.model';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { ConfirmActionDialog } from '@app/shared/components/confirm-action-dialog/confirm-action-dialog';
import { CategoryFacade } from '../category.facade';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [CommonModule, CategoryModal, PrimaryButton, ConfirmActionDialog],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoriesList {
  protected readonly facade = inject(CategoryFacade);
  private readonly categoryService = inject(CategoryService);
  private readonly modal = viewChild.required(CategoryModal);

  protected readonly loading = this.categoryService.loading;
  protected readonly error = this.categoryService.error;

  openAddModal(): void {
    this.modal().open();
  }

  openEditModal(category: Category): void {
    this.modal().open(category);
  }

  deleteCategory(id: number): void {
    this.facade.deleteCategory(id);
  }

  onConfirmDelete(): void {
    this.facade.confirmDelete();
  }

  closeDeleteModal(): void {
    this.facade.closeDeleteModal();
  }
}
