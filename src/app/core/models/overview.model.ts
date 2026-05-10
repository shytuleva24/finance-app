import { Category } from './category.model';

export interface CategoryTotal extends Category {
  readonly totalAmount: number;
}

export interface OverviewData {
  readonly currentBalance: number;
  readonly totalIncome: number;
  readonly totalExpenses: number;
  readonly categoryTotals: CategoryTotal[];
}
