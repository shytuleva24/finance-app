export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export type TransactionType = 'OUTCOME' | 'INCOME';

/**
 * Represents a single financial movement.
 * This is the source of truth for the financial state.
 */
export interface Transaction {
  readonly id: number;
  readonly categoryId: string;
  readonly amount: string;
  readonly type: TransactionType;
  readonly date: string;
  readonly description?: string;
  readonly category?: {
    id: number;
    name: string;
    color: string;
    type: TransactionType;
  };
}
