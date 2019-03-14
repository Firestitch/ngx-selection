import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material';
import { SelectionRef } from '../../classes/selection-ref.model';
import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';
import { SelectionDialogConfigAction } from '../../interfaces/selection-dialog-config.interface';
import { SelectionActionType } from '../../classes/selection-action-type.enum';


@Component({
  templateUrl: 'selection-dialog.component.html'
})
export class SelectionDialogComponent {

  public allSelected = false;

  public allCount = 0;
  public selectedCount = 0;

  public selectedAction: SelectionDialogConfigAction = null;

  private selectionRef: SelectionRef;

  constructor(
    public dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _dialog: MatDialog,
  ) {
    this.selectionRef = this.data.selectionRef;

    this.selectedCount = this.data.config.selectedCount;
    this.allCount = this.data.config.allCount;
  }

  public actionClick(action: SelectionDialogConfigAction): void {
    this.selectionRef.action({
      label: action.label,
      value: action.value,
      all: this.allSelected,
    });
  }

  public selectAllClick(): void {
    this.allSelected = true;
    this.selectionRef.selectAll(this.allSelected);
  }

  public cancelClick(): void {
    this.selectionRef.cancel();
  }

  public updateSelected(selectedCount: number): void {
    this.selectedCount = selectedCount;

    this.allSelected = this.selectedCount === this.allCount;
  }

  public updateAllCount(allCount: number): void {
    this.allCount = allCount;

    this.allSelected = this.selectedCount === this.allCount;
  }

  public selectAction(action) {
    if (action.value.type === SelectionActionType.Action) {
      this.actionClick(action.value);
    } else if (action.value.type === SelectionActionType.Select) {
      this.optionClick(action.value);
    }

    // Set timeout is very important feature here, because it's ng material value won't be updated without timeout
    setTimeout(() => {
      this.selectedAction = null;
    }, 300);
  }

  public optionClick(action: SelectionDialogConfigAction) {
    const dialogRef = this._dialog.open(OptionsDialogComponent, { data: action });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        const selectedOption = {
          label: response.name,
          value: response.value,
          all: this.allSelected,
        };

        this.actionClick(selectedOption);
      }
    })
  }
}
