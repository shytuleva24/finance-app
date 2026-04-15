/**
 * Represents a budget goal for a specific expense category.
 */
export interface Budget {
  readonly id: string;
  readonly categoryId: string;
  readonly limit: number;
  readonly currency: string;
  readonly type: 'expense' | 'income';
  readonly description?: string;
}

/**
 * Calculated budget view with spent amount derived from transactions.
 */
export interface BudgetView extends Budget {
  readonly spent: number;
  readonly remaining: number;
  readonly theme: string; // Derived from category
}
