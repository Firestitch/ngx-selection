import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionRef } from '../../classes';


@Component({
  templateUrl: 'selection-dialog.component.html'
})
export class SelectionDialogComponent {

  public allSelected = false;
  private selectionRef: SelectionRef;

  constructor(
    public dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
    this.selectionRef = this.data.selectionRef;
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
}
