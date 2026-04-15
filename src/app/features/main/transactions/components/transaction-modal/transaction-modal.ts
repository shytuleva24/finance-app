import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { CategoryService } from '@app/core/services/category.service';
import { TransactionType } from '@app/core/models/transaction.model';
import { Modal } from '@app/shared/components/modal/modal';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, Modal, PrimaryButton],
  templateUrl: './transaction-modal.html',
  styleUrl: './transaction-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionModal {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);

  isOpen = signal(false);

  form = this.fb.nonNullable.group({
    type: this.fb.nonNullable.control<TransactionType>('expense'),
    categoryId: this.fb.nonNullable.control('', [Validators.required]),
    amount: this.fb.nonNullable.control(0, [Validators.required, Validators.min(0.01)]),
    description: this.fb.nonNullable.control('', [Validators.required]),
    date: this.fb.nonNullable.control(new Date().toISOString().split('T')[0], [
      Validators.required,
    ]),
    currency: this.fb.nonNullable.control('USD'),
  });

  filteredCategories = computed(() => {
    const type = this.form.get('type')?.value;
    return type === 'income'
      ? this.categoryService.getIncomeCategories()
      : this.categoryService.getExpenseCategories();
  });

  open(): void {
    this.form.reset({
      type: 'expense',
      categoryId: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      currency: 'USD',
    });
    this.isOpen.set(true);
  }

  close(): void {
    this.isOpen.set(false);
  }
}
