import { MatDialogRef } from '@angular/material/dialog';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SelectionDialogComponent } from '../components/selection-dialog/selection-dialog.component';
import {
  FsSelectionActionSelected,
  FsSelectionDialogConfig, FsSelectionDialogConfigAction,
} from '../interfaces/selection-dialog-config.interface';

import { SelectionConfig } from './selection-config';


export class SelectionRef {

  public dialogRef: MatDialogRef<SelectionDialogComponent>;
  

  private readonly _config: SelectionConfig;
  private _actionSelected$ = new Subject<FsSelectionActionSelected>();
  private _allSelect$ = new Subject<boolean>();
  private _cancel$ = new Subject<void>();
  private _destroy$ = new Subject<void>();

  constructor(config: FsSelectionDialogConfig) {
    this._config = new SelectionConfig(config);
  }
  
  public get destroy$(): Observable<void> {
    return this._destroy$.asObservable();
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
  public actionSelected$(): Observable<FsSelectionActionSelected> {
    return this._actionSelected$.pipe(takeUntil(this._destroy$));
  }

  /**
   * Subscribe when "Select All" is selected
   */
  public allSelected$(): Observable<boolean> {
    return this._allSelect$.pipe(takeUntil(this._destroy$));
  }

  /**
   * Subscribe when dialog ref was closed
   */
  public cancelled$(): Observable<void> {
    return this._cancel$.pipe(takeUntil(this._destroy$));
  }

  /**
   * Share event when action was clicked
   * @param data
   */
  public action(data: FsSelectionActionSelected) {
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
    return this._cancel$.next(null);
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

  public actionDisabledSwitch(actionName: string, disabled: boolean) {
    this._config.actions
      .find((item) => item.name === actionName)
      .disabled = disabled;
  }

  public resetActions() {
    this._config.resetActions();
  }

  /**
   * Destroy ref
   */
  public destroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
    this._config.destroy();
  }
}
