import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { Modal } from '@app/shared/components/modal/modal';
import { CategoryService } from '@app/core/services/category.service';

@Component({
  selector: 'app-recurring-rule-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Modal, PrimaryButton],
  templateUrl: './recurring-rule-modal.html',
  styleUrl: './recurring-rule-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecurringRuleModal {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);

  isOpen = signal(false);

  readonly currencies = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'PLN', symbol: 'zł' },
  ];

  form = this.fb.nonNullable.group({
    title: this.fb.nonNullable.control('', [Validators.required]),
    type: this.fb.nonNullable.control<'income' | 'expense'>('expense'),
    categoryId: this.fb.nonNullable.control('', [Validators.required]),
    amount: this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.01)]),
    currency: this.fb.nonNullable.control('USD', [Validators.required]),
    dayOfMonth: this.fb.nonNullable.control(1, [
      Validators.required,
      Validators.min(1),
      Validators.max(31),
    ]),
    startDate: this.fb.nonNullable.control(new Date().toISOString().split('T')[0], [
      Validators.required,
    ]),
    description: this.fb.nonNullable.control(''),
  });

  filteredCategories = computed(() => {
    const type = this.form.get('type')?.value;
    return type === 'income'
      ? this.categoryService.getCategories()
      : this.categoryService.getCategories();
  });

  open(): void {
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
