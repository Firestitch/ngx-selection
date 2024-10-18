import { Injectable } from '@angular/core';

import { Overlay } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material/dialog';

import { takeUntil } from 'rxjs/operators';

import { SelectionRef } from '../classes/selection-ref';
import { SelectionDialogComponent } from '../components/selection-dialog/selection-dialog.component';


@Injectable({
  providedIn: 'root',
})
export class SelectionDialog {

  private _selectionRef: SelectionRef = null;

  constructor(
    public dialog: MatDialog,
    public overlay: Overlay,
  ) {}

  public open(config): SelectionRef {

    if (this._selectionRef) {
      return this._selectionRef;
    }

    this._selectionRef = new SelectionRef(config);

    document.body.classList.add('selection-dialog-opened');

    const dialogRef = this.dialog.open(SelectionDialogComponent, {
      width: '100%',
      panelClass: 'fs-selection-pane',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      hasBackdrop: false,
      position: { left: '0px', bottom: '0px', right: '0px' },
      data: { selectionRef: this._selectionRef },
    });

    this._selectionRef.dialogRef = dialogRef;

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this._selectionRef.destroy$),
      )
      .subscribe(() => {
        this._selectionRef.destroy();
        this._selectionRef = null;
        document.body.classList.remove('selection-dialog-opened');
      });

    return this._selectionRef;
  }
}
