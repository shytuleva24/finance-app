import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewService } from '@app/core/services/overview.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectInputComponent } from '@app/shared/form/select-input/select-input';

export type PresetType = 'month' | '2weeks' | 'year' | 'all' | 'custom';

@Component({
  selector: 'app-overview-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    SelectInputComponent,
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
    { value: '2weeks', label: 'Last 14 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'year', label: 'Last Year' },
    { value: 'all', label: 'All Time' },
    { value: 'custom', label: 'Custom' },
  ];

  private isUpdatingFromPreset = false;

  constructor() {
    this.setPreset('month');

    this.rangeForm.valueChanges.subscribe((value) => {
      if (this.isUpdatingFromPreset) return;

      if (value.start && value.end) {
        this.presetControl.setValue('custom', { emitEvent: false });
        this.rangeChange.emit({
          from: value.start.toISOString(),
          to: value.end.toISOString(),
        });
      }
    });

    this.presetControl.valueChanges.subscribe((value) => {
      if (value && value !== 'custom') {
        this.setPreset(value as PresetType);
      }
    });
  }

  setPreset(type: PresetType) {
    if (type === 'custom') return;
    this.isUpdatingFromPreset = true;
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
    this.isUpdatingFromPreset = false;
  }
}
