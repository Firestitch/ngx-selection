import { MatDialogRef } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SelectionConfig } from './selection-config';
import { SelectionDialogComponent } from '../components/selection-dialog/selection-dialog.component';
import {
  FsSelectionDialogActionSelected,
  FsSelectionDialogConfig, FsSelectionDialogConfigAction
} from '../interfaces/selection-dialog-config.interface';


export class SelectionRef {

  public dialogRef: MatDialogRef<SelectionDialogComponent>;
  public destroy$ = new Subject<void>();

  private readonly _config: SelectionConfig;
  private _actionSelected$ = new Subject<FsSelectionDialogActionSelected>();
  private _allSelect$ = new Subject<boolean>();
  private _cancel$ = new Subject<void>();

  constructor(config: FsSelectionDialogConfig) {
    this._config = new SelectionConfig(config);
  }

  /**
   * Stream with all changes in config
   */
  public get configChanges$() {
    return this._config.changes$;
  }

  /**
   * Subscribe when action selected
   */
  public actionSelected$() {
    return this._actionSelected$.pipe(takeUntil(this.destroy$));
  }

  /**
   * Subscribe when "Select All" is selected
   */
  public allSelected$(): Observable<boolean> {
    return this._allSelect$.pipe(takeUntil(this.destroy$));
  }

  /**
   * Subscribe when dialog ref was closed
   */
  public cancelled$(): Observable<void> {
    return this._cancel$.pipe(takeUntil(this.destroy$));
  }

  /**
   * Share event when action was clicked
   * @param data
   */
  public action(data: FsSelectionDialogActionSelected) {
    return this._actionSelected$.next(data);
  }

  /**
   * Share event when "Select All" was clicked
   * @param data
   */
  public selectAll(data: boolean) {
    return this._allSelect$.next(data);
  }

  /**
   * Share event when dialog ref was canceled
   */
  public cancel() {
    this.close();

    return this._cancel$.next();
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
    this._config.selectedCount = selectedCount;
  }

  /**
   * Update total count for select
   * @param allCount
   */
  public updateAllCount(allCount: number): void {
    this._config.allCount = allCount;
  }

  /**
   * Update if all checkboxes was selected or not
   * @param status
   */
  public updateSelectedAllStatus(status: boolean) {
    this._config.selectedAllStatus = status;
  }

  public updateActions(actions: FsSelectionDialogConfigAction[]) {
    this._config.actions = actions;
  }

  public resetActions() {
    this._config.resetActions();
  }

  /**
   * Destroy ref
   */
  public destroy() {
    this.destroy$.next();
    this.destroy$.complete();

    this._config.destroy();
  }
}
