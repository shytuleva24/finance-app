import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { OverviewData } from '@app/core/models/overview.model';

@Component({
  selector: 'app-overview-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, CurrencyPipe],
  templateUrl: './overview-chart.html',
  styleUrl: './overview-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewChart {
  data = input<OverviewData | null | undefined>(null);

  public doughnutChartType = 'doughnut' as const;

  public chartData = computed<ChartData<'doughnut'>>(() => {
    const d = this.data();
    if (!d || !d.categoryTotals.length) {
      return {
        labels: [],
        datasets: [{ data: [], backgroundColor: [] }],
      };
    }

    return {
      labels: d.categoryTotals.map((c) => c.name),
      datasets: [
        {
          data: d.categoryTotals.map((c) => c.totalAmount),
          backgroundColor: d.categoryTotals.map((c) => c.color),
          hoverBackgroundColor: d.categoryTotals.map((c) => c.color),
          borderWidth: 0,
        },
      ],
    };
  });

  public chartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    cutout: '70%',
  };
}
