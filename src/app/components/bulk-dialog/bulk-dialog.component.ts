import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BulkRef } from '../../models';

@Component({
  templateUrl: 'bulk-dialog.component.html'
})
export class BulkDialogComponent {

  public allSelected = false;
  private bulkRef: BulkRef;

  constructor(
    public dialogRef: MatDialogRef<BulkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      this.bulkRef = this.data.bulkRef;
    }

    actionClick(action): void {
      this.bulkRef.action({ name: action.name || action.tooltip, value: action.value, all: this.allSelected });
    }

    selectAllClick(): void {
      this.bulkRef.selectAll(this.allSelected);
    }

    cancelClick(): void {
      this.bulkRef.cancel();
    }
}
