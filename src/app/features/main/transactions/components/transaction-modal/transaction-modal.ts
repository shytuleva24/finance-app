import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '@app/shared/components/modal/modal';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { Transaction } from '@app/core/models/transaction.model';
import { TransactionFacade } from '../../transaction.facade';
import { TextInputComponent } from '@app/shared/form/text-input/text-input';
import { SelectInputComponent, SelectOption } from '@app/shared/form/select-input/select-input';
import { DateInputComponent } from '@app/shared/form/date-input/date-input';
import { NumberInputComponent } from '@app/shared/form/number-input/number-input';
import { TypeSelectorComponent } from '@app/shared/form/type-selector/type-selector';
import { CategoryService } from '@app/core/services/category.service';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    Modal,
    PrimaryButton,
    TextInputComponent,
    DateInputComponent,
    NumberInputComponent,
    SelectInputComponent,
    TypeSelectorComponent,
  ],
  templateUrl: './transaction-modal.html',
  styleUrl: './transaction-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionModal {
  protected readonly facade = inject(TransactionFacade);
  private readonly categoryService = inject(CategoryService);

  protected readonly categoryOptions = computed<SelectOption[]>(() => {
    const currentType = this.facade.form.data().type;
    return this.categoryService
      .categories()
      .filter((cat) => cat.type === currentType)
      .map((cat) => ({
        label: cat.name,
        value: cat.id,
      }));
  });

  openCreate(): void {
    this.facade.openCreate();
  }

  openEdit(transaction: Transaction): void {
    this.facade.openEdit(transaction);
  }

  close(): void {
    this.facade.close();
  }

  submit(): void {
    this.facade.submit();
  }
}
