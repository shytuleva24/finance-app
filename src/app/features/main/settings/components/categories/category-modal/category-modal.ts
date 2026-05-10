import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Modal } from '@app/shared/components/modal/modal';
import { PrimaryButton } from '@app/shared/form/primary-button/primary-button';
import { TextInputComponent } from '@app/shared/form/text-input/text-input';
import { Category } from '@app/core/models/category.model';
import { MAX_TEXT_LENGTH, nameValidations } from '@app/core/constants/form.constants';
import { AVAILABLE_COLORS } from '@app/core/constants/category.constants';
import { CategoryFacade } from '../category.facade';
import { TypeSelectorComponent } from '@app/shared/form/type-selector/type-selector';

@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [CommonModule, Modal, PrimaryButton, TextInputComponent, TypeSelectorComponent],
  templateUrl: './category-modal.html',
  styleUrl: './category-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryModal {
  protected readonly facade = inject(CategoryFacade);

  protected readonly nameValidations = nameValidations;
  protected readonly MAX_TEXT_LENGTH = MAX_TEXT_LENGTH;
  protected readonly availableColors = AVAILABLE_COLORS;

  open(category?: Category): void {
    this.facade.open(category);
  }

  close(): void {
    this.facade.close();
  }

  submit(): void {
    this.facade.submit();
  }

  selectColor(color: string): void {
    this.facade.selectColor(color);
  }
}
