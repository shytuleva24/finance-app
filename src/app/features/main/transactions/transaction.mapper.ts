import { Transaction, TransactionType } from '@app/core/models/transaction.model';
import { Category } from '@app/core/models/category.model';
import { formatWithSeparators, stripSeparators } from '@app/shared/utils/number-format.util';

export interface TransactionViewModel extends Transaction {
  readonly formattedDate: string;
  readonly isIncome: boolean;
  readonly displayAmount: string;
  readonly categoryName: string;
  readonly categoryColor: string;
  readonly categoryIcon: string;
}

export interface TransactionFormModel {
  type: TransactionType;
  categoryId: string;
  amount: string;
  description: string;
  date: string;
}

export class TransactionMapper {
  static toViewModel(transaction: Transaction, categories: Category[] = []): TransactionViewModel {
    const categoryMap = new Map(categories.map((c) => [String(c.id), c]));
    const category = transaction.category || categoryMap.get(String(transaction.categoryId));

    return {
      ...transaction,
      isIncome: transaction.type === 'INCOME',
      displayAmount: `${transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount}`,
      formattedDate: transaction.date, // This could be more complex if needed
      categoryName: category?.name || 'Unknown',
      categoryColor: category?.color || '#97A0AC',
      categoryIcon: (category?.name || ' ')[0].toUpperCase(),
    };
  }

  static toFormModel(transaction: Transaction): TransactionFormModel {
    return {
      type: transaction.type,
      categoryId: String(transaction.categoryId),
      amount: formatWithSeparators(transaction.amount),
      description: transaction.description || '',
      date: transaction.date.split('T')[0],
    };
  }

  static fromFormModel(form: TransactionFormModel): Omit<Transaction, 'id'> {
    return {
      ...form,
      amount: stripSeparators(form.amount),
      date: new Date(form.date).toISOString(),
    };
  }
}
