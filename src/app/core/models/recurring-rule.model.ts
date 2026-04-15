export type RecurringFrequency = 'monthly';

/**
 * Defines a rule for generating transactions automatically on a schedule.
 */
export interface RecurringRule {
  readonly id: string;
  readonly title: string;
  readonly amount: number;
  readonly type: 'income' | 'expense';
  readonly categoryId: string;
  readonly currency: string;
  readonly schedule: {
    readonly frequency: RecurringFrequency;
    readonly dayOfMonth: number;
  };
  readonly startDate: string; // ISO string
  readonly endDate?: string; // ISO string
  readonly isActive: boolean;
  readonly description?: string;
}
