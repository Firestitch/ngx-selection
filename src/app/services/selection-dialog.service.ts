import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Overlay } from '@angular/cdk/overlay';

import { takeUntil } from 'rxjs/operators';

import { SelectionDialogComponent } from '../components/selection-dialog/selection-dialog.component';
import { SelectionRef } from '../classes/selection-ref';


@Injectable()
export class SelectionDialog {

  private selectionRef: SelectionRef = null;

  constructor(public dialog: MatDialog, public overlay: Overlay) {}

  public open(config): SelectionRef {

    if (this.selectionRef) {
      return this.selectionRef;
    }

    this.selectionRef = new SelectionRef(config);

    const dialogRef = this.dialog.open(SelectionDialogComponent, {
      width: '100%',
      panelClass: 'fs-selection-pane',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      position: { left: '0px', bottom: '0px', right: '0px' },
      data: { selectionRef: this.selectionRef }
    });

    this.selectionRef.dialogRef = dialogRef;

    dialogRef.beforeClosed()
      .pipe(
        takeUntil(this.selectionRef.destroy$)
      )
      .subscribe(result => {
        this.selectionRef.cancel();
      });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.selectionRef.destroy$)
      )
      .subscribe(result => {
        this.selectionRef.destroy();
        this.selectionRef = null;
      });

    return this.selectionRef;
  }
}
