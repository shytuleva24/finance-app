export type CategoryType = 'OUTCOME' | 'INCOME';

/**
 * Represents a financial category for classifying transactions and budgets.
 */
export interface Category {
  readonly id: number;
  readonly name: string;
  readonly type: CategoryType;
  readonly color: string;
}
