import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '@app/shared/components/modal/modal';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { TextInputComponent } from '@app/shared/form/text-input/text-input';
import { Category } from '@app/core/models/category.model';
import { MAX_TEXT_LENGTH, nameValidations } from '@app/core/constants/form.constants';
import {
  AVAILABLE_COLORS,
  INITIAL_CATEGORY_FORM_DATA,
} from '@app/core/constants/category.constants';
import { CategoryService } from '@app/core/services/category.service';
import { createFormState, FormValidations } from '@app/shared/utils/form-state.util';
import { tap } from 'rxjs';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, Modal, PrimaryButton, TextInputComponent],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryModal {
  private readonly categoryService = inject(CategoryService);
  isOpen = signal(false);
  isEditMode = signal(false);
  editingCategoryId = signal<number | null>(null);

  protected readonly nameValidations = nameValidations;
  readonly MAX_TEXT_LENGTH = MAX_TEXT_LENGTH;
  protected readonly availableColors = AVAILABLE_COLORS;
  protected readonly usedColors = computed(() => {
    const categories = this.categoryService.categories();
    const currentId = this.editingCategoryId();
    return categories.filter((c) => c.id !== currentId).map((c) => c.color);
  });

  isColorUsed(color: string): boolean {
    return this.usedColors().includes(color);
  }

  selectColor(color: string): void {
    this.form.updateField('color', color);
  }

  protected readonly form = createFormState(INITIAL_CATEGORY_FORM_DATA, {
    name: this.nameValidations,
    type: { required: 'Type is required' },
    color: { required: 'Color is required' },
  } as FormValidations<typeof INITIAL_CATEGORY_FORM_DATA>);

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
        this.availableColors.find((color) => !this.isColorUsed(color.color))?.color ||
        this.availableColors[0].color;
      this.form.reset({ ...INITIAL_CATEGORY_FORM_DATA, color: firstUnusedColor });
    }
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
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
}
