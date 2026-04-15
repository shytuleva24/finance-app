import { computed, Injectable, signal } from '@angular/core';
import { Pot } from '../models/pot.model';

@Injectable({
  providedIn: 'root',
})
export class PotService {
  private readonly pots = signal<Pot[]>(this.getInitialPots());

  readonly allPots = this.pots.asReadonly();

  readonly totalSaved = computed(() => this.pots().reduce((sum, pot) => sum + pot.total, 0));

  addPot(pot: Pot): void {
    this.pots.update((prev) => [...prev, pot]);
  }

  updatePot(id: string, updates: Partial<Pot>): void {
    this.pots.update((prev) => prev.map((pot) => (pot.id === id ? { ...pot, ...updates } : pot)));
  }

  deletePot(id: string): void {
    this.pots.update((prev) => prev.filter((pot) => pot.id !== id));
  }

  addToPot(id: string, amount: number): void {
    this.pots.update((prev) =>
      prev.map((pot) => (pot.id === id ? { ...pot, total: pot.total + amount } : pot)),
    );
  }

  private getInitialPots(): Pot[] {
    return [];
  }
}
