import { computed, Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly categories = signal<Category[]>(this.getDefaultCategories());

  readonly allCategories = this.categories.asReadonly();

  private getDefaultCategories(): Category[] {
    return [
      { id: 'rent', name: 'Rent', type: 'expense', color: '#826CB0', isSystem: false },
      { id: 'car', name: 'Car', type: 'expense', color: '#626070', isSystem: false },
      { id: 'taxes', name: 'Taxes', type: 'expense', color: '#C94736', isSystem: false },
      { id: 'food', name: 'Food', type: 'expense', color: '#82C9D7', isSystem: false },
      {
        id: 'entertainment',
        name: 'Entertainment',
        type: 'expense',
        color: '#277C78',
        isSystem: false,
      },
      { id: 'travel', name: 'Travel', type: 'expense', color: '#F2CDAC', isSystem: false },
      { id: 'clothing', name: 'Clothing', type: 'expense', color: '#934F6F', isSystem: false },
      { id: 'smoking', name: 'Smoking', type: 'expense', color: '#93674F', isSystem: false },
      {
        id: 'beauty',
        name: 'Beauty / Self Care',
        type: 'expense',
        color: '#AF81BA',
        isSystem: false,
      },
      { id: 'health', name: 'Health', type: 'expense', color: '#597C7C', isSystem: false },
      { id: 'gifts-expense', name: 'Gifts', type: 'expense', color: '#BE6C49', isSystem: false },
      { id: 'other-expense', name: 'Other', type: 'expense', color: '#696868', isSystem: true },
      { id: 'salary', name: 'Salary', type: 'income', color: '#7F9161', isSystem: true },
      { id: 'bonuses', name: 'Bonuses', type: 'income', color: '#CAB361', isSystem: false },
      { id: 'freelance', name: 'Freelance', type: 'income', color: '#3F82B2', isSystem: false },
      { id: 'investments', name: 'Investments', type: 'income', color: '#97A0AC', isSystem: false },
      {
        id: 'gifts-income',
        name: 'Gifts (Income)',
        type: 'income',
        color: '#BE6C49',
        isSystem: false,
      },
      {
        id: 'other-income',
        name: 'Other Income',
        type: 'income',
        color: '#696868',
        isSystem: true,
      },
    ];
  }

  getExpenseCategories = computed(() => this.categories().filter((c) => c.type === 'expense'));

  getIncomeCategories = computed(() => this.categories().filter((c) => c.type === 'income'));

  getCategoryById(id: string): Category | undefined {
    return this.categories().find((c) => c.id === id);
  }
}
