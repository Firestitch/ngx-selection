import { Observable, Subject } from 'rxjs';
import { MatDialogRef } from '@angular/material';
import { takeUntil } from 'rxjs/operators';

import { SelectionDialogComponent } from '../components/selection-dialog/selection-dialog.component';
import { SelectionDialogActionCallbackParams } from '../interfaces/selection-dialog-config.interface';


export class SelectionRef {

  public dialogRef: MatDialogRef<SelectionDialogComponent>;

  private actionSubject = new Subject<SelectionDialogActionCallbackParams>();
  private selectAllSubject = new Subject<boolean>();
  private cancelSubject = new Subject<void>();

  private _destroy = new Subject<void>();

  constructor() {}

  /**
   * Subscribe when action selected
   */
  public onAction() {
    return this.actionSubject.pipe(takeUntil(this._destroy));
  }

  /**
   * Subscribe when "Select All" is selected
   */
  public onSelectAll(): Observable<boolean> {
    return this.selectAllSubject.pipe(takeUntil(this._destroy));
  }

  /**
   * Subscribe when dialog ref was closed
   */
  public onCancel(): Observable<void> {
    return this.cancelSubject.pipe(takeUntil(this._destroy));
  }

  /**
   * Share event when action was clicked
   * @param data
   */
  public action(data: SelectionDialogActionCallbackParams) {
    return this.actionSubject.next(data);
  }

  /**
   * Share event when "Select All" was clicked
   * @param data
   */
  public selectAll(data: boolean) {
    return this.selectAllSubject.next(data);
  }

  /**
   * Share event when dialog ref was canceled
   */
  public cancel() {
    this.close();

    return this.cancelSubject.next();
  }


  /**
   * Close dialog ref
   */
  public close() {
    this.dialogRef.close();
  }

  /**
   * Update count of selected (counter)
   * @param selectedCount
   */
  public updateSelected(selectedCount: number): void {
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.componentInstance.updateSelected(selectedCount);
    }
  }

  /**
   * Update total count for select
   * @param allCount
   */
  public updateAllCount(allCount: number): void {
    if (this.dialogRef && this.dialogRef.componentInstance) {
      this.dialogRef.componentInstance.updateAllCount(allCount);
    }
  }

  /**
   * Update if all checkboxes was selected or not
   * @param status
   */
  public updateSelectedAllStatus(status: boolean) {
    this.dialogRef.componentInstance.allSelected = status;
  }

  /**
   * Destroy ref
   */
  public destroy() {
    this._destroy.next();
    this._destroy.complete();
    this.actionSubject.complete();
    this.selectAllSubject.complete();
    this.cancelSubject.complete();
  }
}
