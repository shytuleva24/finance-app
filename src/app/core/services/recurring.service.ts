import { Injectable, signal } from '@angular/core';
import { RecurringRule } from '../models/recurring-rule.model';

@Injectable({
  providedIn: 'root',
})
export class RecurringService {
  private readonly rules = signal<RecurringRule[]>(this.getInitialRules());

  readonly allRules = this.rules.asReadonly();

  addRule(rule: RecurringRule): void {
    this.rules.update((prev) => [rule, ...prev]);
  }

  updateRule(id: string, updated: Partial<RecurringRule>): void {
    this.rules.update((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)));
  }

  deleteRule(id: string): void {
    this.rules.update((prev) => prev.filter((r) => r.id !== id));
  }

  toggleRuleActive(id: string): void {
    this.rules.update((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isActive: !r.isActive } : r)),
    );
  }

  private getInitialRules(): RecurringRule[] {
    return [];
  }
}
