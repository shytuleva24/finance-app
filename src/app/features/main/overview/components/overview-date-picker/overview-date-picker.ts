import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewService } from '@app/core/services/overview.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-overview-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './overview-date-picker.html',
  styleUrl: './overview-date-picker.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewDatePicker {
  private readonly overviewService = inject(OverviewService);

  @Output() rangeChange = new EventEmitter<{ from: string; to: string }>();

  protected readonly range = this.overviewService.currentRange;

  readonly rangeForm = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  readonly presetControl = new FormControl<string>('month');

  readonly presets = [
    { value: '2weeks', label: '2 Weeks' },
    { value: 'month', label: 'Month' },
    { value: 'year', label: 'Year' },
    { value: 'all', label: 'All Time' },
  ];

  constructor() {
    const current = this.range();
    if (current) {
      this.rangeForm.patchValue({
        start: new Date(current.from),
        end: new Date(current.to),
      });
    }

    this.rangeForm.valueChanges.subscribe((value) => {
      if (value.start && value.end) {
        this.rangeChange.emit({
          from: value.start.toISOString(),
          to: value.end.toISOString(),
        });
      }
    });

    this.presetControl.valueChanges.subscribe((value) => {
      if (value) {
        this.setPreset(value as any);
      }
    });
  }

  setPreset(type: 'month' | '2weeks' | 'year' | 'all') {
    const to = new Date();
    const from = new Date();

    switch (type) {
      case 'month':
        from.setMonth(to.getMonth() - 1);
        break;
      case '2weeks':
        from.setDate(to.getDate() - 14);
        break;
      case 'year':
        from.setFullYear(to.getFullYear() - 1);
        break;
      case 'all':
        from.setFullYear(2000, 0, 1);
        from.setHours(0, 0, 0, 0);
        break;
    }

    this.rangeForm.patchValue({
      start: from,
      end: to,
    });
  }
}
