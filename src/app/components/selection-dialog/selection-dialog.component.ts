import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionRef } from '../../models';

@Component({
  templateUrl: 'selection-dialog.component.html'
})
export class SelectionDialogComponent {

  public allSelected = false;
  private selectionRef: SelectionRef;

  constructor(
    public dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.selectionRef = this.data.selectionRef;
    }

    actionClick(action): void {
      this.selectionRef.action({ name: action.name || action.tooltip, value: action.value, all: this.allSelected });
    }

    selectAllClick(): void {
      this.selectionRef.selectAll(this.allSelected);
    }

    cancelClick(): void {
      this.selectionRef.cancel();
    }
}
