import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Modal } from '@app/shared/components/modal/modal';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { Category, CategoryType } from '@app/core/models/category.model';
import { MAX_TEXT_LENGTH } from '@app/core/constants/form.constants';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Modal, PrimaryButton],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryModal {
  isOpen = signal(false);
  isEditMode = signal(false);
  editingCategoryId = signal<number | null>(null);

  readonly availableColors = [
    { name: 'Green', color: '#277C78' },
    { name: 'Yellow', color: '#F2CDAC' },
    { name: 'Cyan', color: '#82C9D7' },
    { name: 'Navy', color: '#626070' },
    { name: 'Red', color: '#C94736' },
    { name: 'Purple', color: '#826CB0' },
    { name: 'Turquoise', color: '#597C7C' },
    { name: 'Brown', color: '#93674F' },
    { name: 'Magenta', color: '#934F6F' },
    { name: 'Blue', color: '#3F82B2' },
    { name: 'Navy Grey', color: '#97A0AC' },
    { name: 'Army Green', color: '#7F9161' },
    { name: 'Gold', color: '#CAB361' },
    { name: 'Orange', color: '#BE6C49' },
    { name: 'Pink', color: '#AF81BA' },
    { name: 'Light Blue', color: '#5DB7DE' },
    { name: 'Teal', color: '#1E90FF' },
    { name: 'Lime', color: '#32CD32' },
    { name: 'Coral', color: '#FF7F50' },
    { name: 'Indigo', color: '#4B0082' },
    { name: 'Slate', color: '#475569' },
    { name: 'Emerald', color: '#10B981' },
    { name: 'Violet', color: '#8B5CF6' },
    { name: 'Amber', color: '#F59E0B' },
    { name: 'Rose', color: '#F43F5E' },
    { name: 'Sky', color: '#0EA5E9' },
  ];

  selectColor(color: string): void {
    this.form.patchValue({ color });
  }

  readonly MAX_TEXT_LENGTH = MAX_TEXT_LENGTH;

  readonly form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(MAX_TEXT_LENGTH)],
    }),
    type: new FormControl<CategoryType>('OUTCOME', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    color: new FormControl('#277C78', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  open(category?: Category): void {
    if (category) {
      this.isEditMode.set(true);
      this.editingCategoryId.set(category.id);
      this.form.patchValue({
        name: category.name,
        type: category.type,
        color: category.color,
      });
      this.form.controls.type.disable();
    } else {
      this.isEditMode.set(false);
      this.editingCategoryId.set(null);
      this.form.reset({
        name: '',
        type: 'INCOME',
        color: '#277C78',
      });
      this.form.controls.type.enable();
    }
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }

  async submit(): Promise<void> {
    if (this.form.invalid) return;

    this.close();
  }
}
