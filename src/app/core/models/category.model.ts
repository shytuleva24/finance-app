import { TransactionType } from '@app/core/models/transaction.model';

/**
 * Represents a financial category for classifying transactions and budgets.
 */
export interface Category {
  readonly id: number;
  readonly name: string;
  readonly type: TransactionType;
  readonly color: string;
}
