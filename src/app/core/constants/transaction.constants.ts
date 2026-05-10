import { TransactionType } from '@app/core/models/transaction.model';

export const INITIAL_TRANSACTION_FORM_DATA = {
  type: 'OUTCOME' as TransactionType,
  categoryId: '',
  amount: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
};
