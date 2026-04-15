import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Pot } from '@app/core/models/pot.model';
import { PotDialog } from '@app/features/main/pots-page/components/pot-dialog/pot-dialog';
import { AddWithdrawDialog } from '@app/features/main/pots-page/components/add-withdraw-dialog/add-withdraw-dialog';
import { DeletePotDialog } from '@app/features/main/pots-page/components/delete-pot-dialog/delete-pot-dialog';
import { PotCard } from '@app/features/main/pots-page/components/pot-card/pot-card';
import { PotService } from '@app/core/services/pot.service';

@Component({
  selector: 'app-pots',
  standalone: true,
  imports: [PotDialog, AddWithdrawDialog, DeletePotDialog, PotCard],
  templateUrl: './pots.html',
  styleUrl: './pots.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Pots {
  protected readonly potService = inject(PotService);
  readonly pots = this.potService.allPots;
  readonly isPotDialogOpen = signal(false);
  readonly selectedPotForEdit = signal<Pot | null>(null);

  /**
   * State for the Add/Withdraw dialog.
   */
  readonly isAddWithdrawDialogOpen = signal(false);
  readonly addWithdrawMode = signal<'add' | 'withdraw'>('add');
  readonly selectedPotForMoney = signal<Pot | null>(null);

  /**
   * State for the Delete dialog.
   */
  readonly isDeleteDialogOpen = signal(false);
  readonly selectedPotForDelete = signal<Pot | null>(null);

  /**
   * Opens the dialog to add a new pot.
   */
  openAddPotDialog(): void {
    this.selectedPotForEdit.set(null);
    this.isPotDialogOpen.set(true);
  }

  /**
   * Opens the dialog to edit an existing pot.
   */
  openEditPotDialog(pot: Pot): void {
    this.selectedPotForEdit.set(pot);
    this.isPotDialogOpen.set(true);
  }

  /**
   * Saves a pot (new or existing).
   */
  handleSavePot(potData: Omit<Pot, 'id'>): void {
    if (this.selectedPotForEdit()) {
      this.potService.updatePot(this.selectedPotForEdit()!.id, potData);
    } else {
      const newPot: Pot = {
        ...potData,
        id: crypto.randomUUID(),
        total: 0,
      };
      this.potService.addPot(newPot);
    }
    this.isPotDialogOpen.set(false);
  }

  /**
   * Opens the dialog to add money to a pot.
   */
  openAddMoneyDialog(pot: Pot): void {
    this.selectedPotForMoney.set(pot);
    this.addWithdrawMode.set('add');
    this.isAddWithdrawDialogOpen.set(true);
  }

  /**
   * Opens the dialog to withdraw money from a pot.
   */
  openWithdrawDialog(pot: Pot): void {
    this.selectedPotForMoney.set(pot);
    this.addWithdrawMode.set('withdraw');
    this.isAddWithdrawDialogOpen.set(true);
  }

  /**
   * Handles money addition/withdrawal.
   */
  handleMoneyConfirmed(amount: number): void {
    if (this.selectedPotForMoney()) {
      const multiplier = this.addWithdrawMode() === 'add' ? 1 : -1;
      this.potService.addToPot(this.selectedPotForMoney()!.id, amount * multiplier);
      this.isAddWithdrawDialogOpen.set(false);
    }
  }

  /**
   * Opens the delete confirmation dialog.
   */
  openDeleteDialog(pot: Pot): void {
    this.selectedPotForDelete.set(pot);
    this.isDeleteDialogOpen.set(true);
  }

  /**
   * Confirms pot deletion.
   */
  handleDeleteConfirmed(): void {
    if (this.selectedPotForDelete()) {
      this.potService.deletePot(this.selectedPotForDelete()!.id);
      this.isDeleteDialogOpen.set(false);
    }
  }
}
