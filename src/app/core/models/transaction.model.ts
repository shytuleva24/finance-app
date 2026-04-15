export type TransactionType = 'income' | 'expense';

/**
 * Represents a single financial movement.
 * This is the source of truth for the financial state.
 */
export interface Transaction {
  readonly id: string;
  readonly amount: number;
  readonly type: TransactionType;
  readonly categoryId: string;
  readonly currency: string;
  readonly date: string; // ISO string
  readonly description: string;
  readonly isRecurringInstance: boolean;
  readonly recurringRuleId?: string;
}
