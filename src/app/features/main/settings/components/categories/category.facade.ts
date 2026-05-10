import { computed, inject, Injectable, signal } from '@angular/core';
import { CategoryService } from '@app/core/services/category.service';
import { Category } from '@app/core/models/category.model';
import {
  AVAILABLE_COLORS,
  INITIAL_CATEGORY_FORM_DATA,
} from '@app/core/constants/category.constants';
import { createFormState, FormValidations } from '@app/shared/utils/form-state.util';
import { nameValidations } from '@app/core/constants/form.constants';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryFacade {
  private readonly categoryService = inject(CategoryService);

  readonly isOpen = signal(false);
  readonly isEditMode = signal(false);
  readonly editingCategoryId = signal<number | null>(null);

  readonly categories = this.categoryService.categories;

  protected readonly isDeleteModalOpen = signal(false);
  protected readonly categoryToDeleteId = signal<number | null>(null);

  protected readonly categoryToDeleteName = computed(() => {
    const id = this.categoryToDeleteId();
    return id !== null ? this.categoryService.getCategoryById(id)?.name : null;
  });

  readonly expenseCategories = computed(() => {
    return this.categories().filter((c) => c.type === 'OUTCOME');
  });

  readonly incomeCategories = computed(() => {
    return this.categories().filter((c) => c.type === 'INCOME');
  });

  readonly usedColors = computed(() => {
    const categories = this.categories();
    const currentId = this.editingCategoryId();
    return categories.filter((c) => c.id !== currentId).map((c) => c.color);
  });

  readonly form = createFormState(INITIAL_CATEGORY_FORM_DATA, {
    name: nameValidations,
    type: { required: 'Type is required' },
    color: { required: 'Color is required' },
  } as FormValidations<typeof INITIAL_CATEGORY_FORM_DATA>);

  isColorUsed(color: string): boolean {
    return this.usedColors().includes(color);
  }

  selectColor(color: string): void {
    this.form.updateField('color', color);
  }

  open(category?: Category): void {
    if (category) {
      this.isEditMode.set(true);
      this.editingCategoryId.set(category.id);
      this.form.setData({
        name: category.name,
        type: category.type,
        color: category.color,
      });
    } else {
      this.isEditMode.set(false);
      this.editingCategoryId.set(null);
      const firstUnusedColor =
        AVAILABLE_COLORS.find((color) => !this.isColorUsed(color.color))?.color ||
        AVAILABLE_COLORS[0].color;
      this.form.reset({ ...INITIAL_CATEGORY_FORM_DATA, color: firstUnusedColor });
    }
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
    this.form.reset(INITIAL_CATEGORY_FORM_DATA);
  }

  submit(): void {
    if (!this.form.isValid()) return;
    const categoryData = this.form.data() as Category;

    if (this.isEditMode()) {
      const id = this.editingCategoryId();
      if (id !== null) {
        this.form.submit(
          this.categoryService
            .updateCategory({ ...categoryData, id })
            .pipe(tap(() => this.close())),
        );
      }
    } else {
      this.form.submit(
        this.categoryService.createCategory(categoryData).pipe(tap(() => this.close())),
      );
    }
  }

  deleteCategory(id: number): void {
    this.categoryToDeleteId.set(id);
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete(): void {
    const id = this.categoryToDeleteId();
    if (id !== null) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => this.closeDeleteModal(),
      });
    }
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen.set(false);
    this.categoryToDeleteId.set(null);
  }

  get deleteModalState() {
    return {
      isOpen: this.isDeleteModalOpen,
      categoryName: this.categoryToDeleteName,
    };
  }
}
