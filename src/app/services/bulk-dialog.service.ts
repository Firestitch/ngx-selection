import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BulkDialogComponent } from '../components';
import { BulkRef } from '../models';

@Injectable()
export class BulkDialog {

  private isOpen = false;

  constructor(public dialog: MatDialog) {}

  public open(config, data) {

    if (this.isOpen) {
      return;
    }

    this.isOpen = true;

    const bulkRef = new BulkRef();

    const dialogRef = this.dialog.open(BulkDialogComponent, {
      width: '100%',
      panelClass: 'fs-bulk-pane',
      hasBackdrop: false,
      position: { left: '0px', bottom: '0px', right: '0px' },
      data: { data: data, bulkRef: bulkRef, config: config }
    });

    bulkRef.dialogRef = dialogRef;

    dialogRef.beforeClose().subscribe(result => {
      bulkRef.cancel();
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isOpen = false;
    });

    return bulkRef;
  }
}
