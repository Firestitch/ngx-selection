import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { cloneDeep } from 'lodash-es';

import {
  FsSelectionDialogConfig,
  FsSelectionDialogConfigAction,
} from '../interfaces/selection-dialog-config.interface';


export class SelectionConfig {

  private _defaultActions: FsSelectionDialogConfigAction[] = [];

  private _selectedAllStatus$ = new BehaviorSubject(false);
  private _actions$ = new BehaviorSubject<FsSelectionDialogConfigAction[]>([]);
  private _selectedCount$ = new BehaviorSubject<number>(0);
  private _allCount$ = new BehaviorSubject<number>(0);
  private _selectAll$ = new BehaviorSubject<boolean>(true);

  private _destroy$ = new Subject<void>();

  constructor(config: FsSelectionDialogConfig) {
    this._init(config);
  }

  public get changes$() {
    return combineLatest(
      this._selectedCount$,
      this._allCount$,
      this._selectedAllStatus$,
      this._selectAll$,
      this._actions$,
    ).pipe(
      debounceTime(0),
      map(([selectedCount, allCount, selectedAllStatus, selectAll, actions]) => {
        return {
          selectedCount,
          allCount,
          selectedAllStatus,
          selectAll,
          actions,
        };
      }),
    );
  }

  public get actions() {
    return this._actions$.getValue();
  }

  public set actions(value: FsSelectionDialogConfigAction[]) {
    this._actions$.next(value);
  }

  public get selectedCount() {
    return this._selectedCount$.getValue();
  }

  public set selectedCount(value: number) {
    this._selectedCount$.next(value);
  }

  public get allCount() {
    return this._allCount$.getValue();
  }

  public set allCount(value: number) {
    this._allCount$.next(value);
  }

  public get selectedAllStatus() {
    return this._selectedAllStatus$.getValue();
  }

  public set selectedAllStatus(value: boolean) {
    this._selectedAllStatus$.next(value);
  }

  public get selectAll() {
    return this._selectAll$.getValue();
  }

  public set selectAll(value: boolean) {
    this._selectAll$.next(value);
  }

  public resetActions() {
    this.actions = cloneDeep(this._defaultActions);
  }

  public destroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _init(config: FsSelectionDialogConfig) {
    this.selectedCount = config.selectedCount || 0;
    this.allCount = config.allCount || 0;
    this.selectAll = !!config.selectAll;
    this._defaultActions = config.actions;

    this.resetActions();
  }
}
