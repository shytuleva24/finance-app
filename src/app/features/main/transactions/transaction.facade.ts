import { computed, effect, inject, Injectable, signal, untracked } from '@angular/core';
import { TransactionService } from '@app/core/services/transaction.service';
import { CategoryService } from '@app/core/services/category.service';
import { Transaction } from '@app/core/models/transaction.model';
import { INITIAL_TRANSACTION_FORM_DATA } from '@app/core/constants/transaction.constants';
import { createFormState } from '@app/shared/utils/form-state.util';
import { catchError, EMPTY, tap } from 'rxjs';
import { TRANSACTION_CATEGORIES_URL } from '@app/core/constants/api.constants';
import { Category } from '@app/core/models/category.model';
import { httpResource } from '@angular/common/http';
import {
  TransactionFormModel,
  TransactionMapper,
  TransactionViewModel,
} from './transaction.mapper';

@Injectable({
  providedIn: 'root',
})
export class TransactionFacade {
  private readonly transactionService = inject(TransactionService);
  private readonly categoryService = inject(CategoryService);
  private readonly transactionCategoriesUrl = inject(TRANSACTION_CATEGORIES_URL);

  // Modal State
  readonly isModalOpen = signal(false);
  readonly isEditMode = signal(false);
  private readonly editingTransactionId = signal<number | null>(null);

  // Sorting and Filtering State
  readonly sortBy = signal<string>('date');
  readonly sortDirection = signal<'asc' | 'desc'>('desc');
  readonly filterCategoryId = signal<number | null>(null);
  readonly page = signal(0);
  readonly size = signal(10);

  // API Data
  private readonly transactions = this.transactionService.transactions;
  readonly transactionsPage = this.transactionService.transactionsPage;

  protected readonly isDeleteModalOpen = signal(false);
  protected readonly transactionToDeleteId = signal<number | null>(null);

  protected readonly transactionToDeleteDescription = computed(() => {
    const id = this.transactionToDeleteId();
    if (id === null) return null;
    return this.transactions().find((t) => t.id === id)?.description || 'this transaction';
  });

  private readonly transactionCategoriesResource = httpResource<Category[]>(
    () => this.transactionCategoriesUrl as string,
  );

  readonly categories = computed(() => {
    const val = this.transactionCategoriesResource.value();
    return Array.isArray(val) ? val : [];
  });

  readonly isLoading = computed(
    () => this.transactionService.loading() || this.transactionCategoriesResource.isLoading(),
  );
  readonly error = computed(
    () => this.transactionService.error() || this.transactionCategoriesResource.error(),
  );

  // Derived State
  readonly queryParams = computed(() => ({
    page: this.page(),
    size: this.size(),
    sort: `${this.sortBy()},${this.sortDirection()}`,
    categoryId: this.filterCategoryId() === null ? null : String(this.filterCategoryId()),
  }));

  readonly viewModels = computed<TransactionViewModel[]>(() => {
    const transactions = this.transactions();
    const categories = this.categories();

    if (!Array.isArray(transactions)) {
      return [];
    }

    return transactions.map((t) => TransactionMapper.toViewModel(t, categories));
  });

  constructor() {
    effect(() => {
      const params = this.queryParams();
      untracked(() => {
        this.transactionService.updateParams(params);
      });
    });
  }

  readonly form = createFormState<TransactionFormModel>(INITIAL_TRANSACTION_FORM_DATA, {
    categoryId: { required: 'Category is required' },
    amount: { required: 'Amount is required' },
    type: { required: 'Type is required' },
    date: { required: 'Date is required' },
    description: {},
  });

  toggleSort(field: string): void {
    if (this.sortBy() === field) {
      this.sortDirection.update((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      this.sortBy.set(field);
      this.sortDirection.set('asc');
    }
    this.page.set(0);
  }

  setFilterCategory(id: number | null): void {
    this.filterCategoryId.set(id);
    this.page.set(0);
  }

  setPage(page: number): void {
    this.page.set(page);
  }

  openCreate(): void {
    this.isEditMode.set(false);
    this.editingTransactionId.set(null);
    this.form.reset(INITIAL_TRANSACTION_FORM_DATA);
    this.isModalOpen.set(true);
  }

  openEdit(transaction: Transaction): void {
    this.isEditMode.set(true);
    this.editingTransactionId.set(transaction.id);
    this.form.setData(TransactionMapper.toFormModel(transaction));
    this.isModalOpen.set(true);
  }

  close(): void {
    this.isModalOpen.set(false);
    this.form.reset(INITIAL_TRANSACTION_FORM_DATA);
  }

  submit(): void {
    if (!this.form.isValid()) return;

    const transactionData = TransactionMapper.fromFormModel(this.form.data());
    const id = this.editingTransactionId();

    const request$ = id
      ? this.transactionService.updateTransaction({ ...transactionData, id } as Transaction)
      : this.transactionService.createTransaction(transactionData);

    this.form.submit(
      request$.pipe(
        tap(() => this.close()),
        catchError(() => {
          return EMPTY;
        }),
      ),
    );
  }

  deleteTransaction(id: number): void {
    this.transactionToDeleteId.set(id);
    this.isDeleteModalOpen.set(true);
  }

  confirmDelete(): void {
    const id = this.transactionToDeleteId();
    if (id !== null) {
      this.transactionService.deleteTransaction(id).subscribe({
        next: () => this.closeDeleteModal(),
      });
    }
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen.set(false);
    this.transactionToDeleteId.set(null);
  }

  get deleteModalState() {
    return {
      isOpen: this.isDeleteModalOpen,
      transactionDescription: this.transactionToDeleteDescription,
    };
  }
}
