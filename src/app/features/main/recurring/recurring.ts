import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '@app/core/services/category.service';
import { RecurringRuleModal } from '@app/features/main/recurring/components/recurring-rule-modal/recurring-rule-modal';
import { RecurringService } from '@app/core/services/recurring.service';

@Component({
  selector: 'app-recurring-bills',
  standalone: true,
  imports: [RecurringRuleModal, CommonModule],
  templateUrl: './recurring.html',
  styleUrl: './recurring.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecurringBills {
  private readonly categoryService = inject(CategoryService);
  protected readonly recurringService = inject(RecurringService);

  private readonly modal = viewChild.required(RecurringRuleModal);

  readonly rules = this.recurringService.allRules;

  getCategoryName(id: string): string {
    return this.categoryService.getCategoryById(id)?.name ?? 'Other';
  }

  openAddModal(): void {
    this.modal().open();
  }

  toggleActive(id: string): void {
    this.recurringService.toggleRuleActive(id);
  }
}
