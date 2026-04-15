export type CategoryType = 'expense' | 'income';

/**
 * Represents a financial category for classifying transactions and budgets.
 */
export interface Category {
  readonly id: string;
  readonly name: string;
  readonly type: CategoryType;
  readonly color: string;
  readonly icon?: string;
  readonly isSystem: boolean;
}
