import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionRef } from '../../classes';


@Component({
  templateUrl: 'selection-dialog.component.html'
})
export class SelectionDialogComponent {

  public allSelected = false;

  public allCount = 0;
  public selectedCount = 0;

  private selectionRef: SelectionRef;

  constructor(
    public dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.selectionRef = this.data.selectionRef;

    this.selectedCount = this.data.config.selectedCount;
    this.allCount = this.data.config.allCount;
  }

  public actionClick(action): void {
    this.selectionRef.action({
      name: action.name || action.tooltip,
      value: action.value,
      all: this.allSelected,
    });
  }

  public selectAllClick(): void {
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
}
