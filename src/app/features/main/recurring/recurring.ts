import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  protected readonly recurringService = inject(RecurringService);

  private readonly modal = viewChild.required(RecurringRuleModal);

  readonly rules = this.recurringService.allRules;

  getCategoryName(_id: string): string {
    return 'Other';
  }

  openAddModal(): void {
    this.modal().open();
  }

  toggleActive(id: string): void {
    this.recurringService.toggleRuleActive(id);
  }
}
