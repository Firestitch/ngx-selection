import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

import { cloneDeep } from 'lodash-es';

import {
  SelectionDialogConfig,
  SelectionDialogConfigAction
} from '../interfaces/selection-dialog-config.interface';


export class SelectionConfig {

  private _defaultActions: SelectionDialogConfigAction[] = [];

  private _selectedAllStatus$ = new BehaviorSubject(false);
  private _actions$ = new BehaviorSubject<SelectionDialogConfigAction[]>([]);
  private _selectedCount$ = new BehaviorSubject<number>(0);
  private _allCount$ = new BehaviorSubject<number>(0);
  private _selectAll$ = new BehaviorSubject<boolean>(true);

  private _destroy$ = new Subject<void>();

  constructor(config: SelectionDialogConfig) {
    this._init(config);
  }

  get changes$() {
    return combineLatest(
      this._selectedCount$,
      this._allCount$,
      this._selectedAllStatus$,
      this._selectAll$,
      this._actions$
    ).pipe(
      debounceTime(0),
      map(([selectedCount, allCount, selectedAllStatus, selectAll, actions]) => {
        return {
          selectedCount,
          allCount,
          selectedAllStatus,
          selectAll,
          actions
        }
      })
    )
  }

  get actions() {
    return this._actions$.getValue();
  }

  set actions(value: SelectionDialogConfigAction[]) {
    this._actions$.next(value);
  }

  get selectedCount() {
    return this._selectedCount$.getValue();
  }

  set selectedCount(value: number) {
    this._selectedCount$.next(value);
  }

  get allCount() {
    return this._allCount$.getValue();
  }

  set allCount(value: number) {
    this._allCount$.next(value);
  }

  get selectedAllStatus() {
    return this._selectedAllStatus$.getValue();
  }

  set selectedAllStatus(value: boolean) {
    this._selectedAllStatus$.next(value);
  }

  get selectAll() {
    return this._selectAll$.getValue();
  }

  set selectAll(value: boolean) {
    this._selectAll$.next(value);
  }

  public resetActions() {
    this.actions = cloneDeep(this._defaultActions);
  }

  public destroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _init(config: SelectionDialogConfig) {
    this.selectedCount = config.selectedCount || 0;
    this.allCount = config.allCount || 0;
    this.selectAll = config.selectAll === undefined || config.selectAll;
    this._defaultActions = config.actions;

    this.resetActions();
  }
}
