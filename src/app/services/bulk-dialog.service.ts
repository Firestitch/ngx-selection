import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BulkDialogComponent } from '../components';
import { BulkRef } from '../models';

@Injectable()
export class BulkDialog {

  private bulkRef = null;

  constructor(public dialog: MatDialog) {}

  public open(config, data) {

    if (this.bulkRef) {
      return this.bulkRef;
    }

    this.bulkRef = new BulkRef();

    const dialogRef = this.dialog.open(BulkDialogComponent, {
      width: '100%',
      panelClass: 'fs-bulk-pane',
      hasBackdrop: false,
      position: { left: '0px', bottom: '0px', right: '0px' },
      data: { data: data, bulkRef: this.bulkRef, config: config }
    });

    this.bulkRef.dialogRef = dialogRef;

    dialogRef.beforeClose().subscribe(result => {
      this.bulkRef.cancel();
    });

    dialogRef.afterClosed().subscribe(result => {
      this.bulkRef = null;
    });

    return this.bulkRef;
  }
}
