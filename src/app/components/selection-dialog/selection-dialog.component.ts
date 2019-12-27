import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { SelectionRef } from '../../classes/selection-ref';
import { OptionsDialogComponent } from '../options-dialog/options-dialog.component';
import { FsSelectionDialogConfigAction } from '../../interfaces/selection-dialog-config.interface';
import { SelectionActionType } from '../../classes/selection-action-type.enum';


@Component({
  templateUrl: 'selection-dialog.component.html',
  styleUrls: [
    './selection-dialog.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectionDialogComponent implements OnInit, OnDestroy {

  public selectAllEnabled = true;
  public allSelected = false;
  public allCount = 0;

  public actions: FsSelectionDialogConfigAction[] = [];

  public selectedAction: FsSelectionDialogConfigAction = null;
  public selectionIsEmpty = true;

  public singleActionMode = false;
  public noActionsAvailable = false;
  public selectorPlaceholder = 'ACTIONS';

  private readonly _selectionRef: SelectionRef;
  private readonly  _destroy$ = new Subject<void>();

  private _selectedCount = 0;

  constructor(
    public dialogRef: MatDialogRef<SelectionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _dialog: MatDialog,
    private _cdRef: ChangeDetectorRef,
  ) {
    this._selectionRef = this.data.selectionRef;
  }

  set selectedCount(value) {
    this._selectedCount = value;
    this.selectionIsEmpty = this._selectedCount === 0;
  }

  get selectedCount() {
    return this._selectedCount;
  }

  public ngOnInit(): void {
    this._listenConfigChanges();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public actionClick(action: FsSelectionDialogConfigAction): void {
    this._selectionRef.action({
      label: action.label,
      value: action.value,
      all: this.allSelected,
    });
  }

  public selectAllClick(): void {
    this.allSelected = true;
    this.selectedCount = this.allCount;
    this._selectionRef.selectAll(this.allSelected);
  }

  public cancelClick(): void {
    this._selectionRef.cancel();
  }

  public selectAction(action) {
    this.selectedAction = action;

    if (action.value.type === SelectionActionType.Action) {
      this.actionClick(action.value);
    } else if (action.value.type === SelectionActionType.Select) {
      this.optionClick(action.value);
    }

    // Set timeout is very important feature here, because ng material value won't be updated without timeout
    setTimeout(() => {
      this.selectedAction = null;

      this._cdRef.markForCheck();
    }, 300);
  }

  public optionClick(action: FsSelectionDialogConfigAction) {
    const dialogRef = this._dialog.open(OptionsDialogComponent, { data: action });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((response) => {
        if (response) {
          const selectedOption = {
            label: response.name,
            value: response.value,
            all: this.allSelected,
          };

          this.actionClick(selectedOption);

          this._cdRef.markForCheck();
        }
      })
  }

  private _listenConfigChanges() {
    this._selectionRef.configChanges$
      .pipe(
        takeUntil(this._destroy$),
      )
      .subscribe((changes) => {
        this.allCount = changes.allCount;
        this.selectedCount = changes.selectedCount;
        this.actions = changes.actions;
        this.selectAllEnabled = changes.selectAll;

        const countOfActions = this.actions.length;

        if (countOfActions === 0 ) {
          this.selectorPlaceholder = 'NO ACTIONS AVAILABLE';
          this.noActionsAvailable = true;
          this.singleActionMode = false;

        } else if (countOfActions === 1) {
          this.noActionsAvailable = false;
          this.singleActionMode = true;

        } else {
          this.selectorPlaceholder = 'ACTIONS';
          this.noActionsAvailable = false;
          this.singleActionMode = false;
        }

        if (changes.selectedAllStatus === this.allSelected) {
          this._checkIfAllSelected();
        } else {
          this.allSelected = changes.selectedAllStatus;
        }

        this._cdRef.markForCheck();
      });
  }

  private _checkIfAllSelected() {
    this.allSelected = this.selectedCount === this.allCount;
  }
}
