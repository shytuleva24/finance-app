import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TransactionService } from '@app/core/services/transaction.service';
import { PotService } from '@app/core/services/pot.service';
import { OverviewService } from '@app/core/services/overview.service';
import { OverviewChart } from './components/overview-chart/overview-chart';
import { OverviewDatePicker } from '@app/features/main/overview/components/overview-date-picker/overview-date-picker';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, RouterLink, OverviewChart, CurrencyPipe, OverviewDatePicker],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview implements OnInit {
  protected readonly transactionService = inject(TransactionService);
  protected readonly potService = inject(PotService);
  protected readonly overviewService = inject(OverviewService);

  readonly recentTransactions = computed(() => {
    const transactions = this.transactionService.transactions();
    return Array.isArray(transactions) ? transactions.slice(0, 5) : [];
  });

  readonly overviewData = this.overviewService.overviewData;

  ngOnInit() {
    if (!this.overviewService.currentRange()) {
      const to = new Date();
      const from = new Date();
      from.setMonth(to.getMonth() - 1);

      this.overviewService.updateRange(from.toISOString(), to.toISOString());
    }
  }

  updateRange(range: { from: string; to: string }) {
    this.overviewService.updateRange(range.from, range.to);
  }
}
