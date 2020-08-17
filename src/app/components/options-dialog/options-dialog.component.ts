import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { isArray, isObject } from 'lodash-es';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { FsSelectionDialogConfigActionValue } from '../../interfaces/selection-dialog-config.interface';
import { isFunction } from 'rxjs/internal-compatibility';


@Component({
  templateUrl: 'options-dialog.component.html',
  styleUrls: ['options-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsDialogComponent implements OnInit, OnDestroy {
  public options: FsSelectionDialogConfigActionValue[] = [];
  public selectedOption: FsSelectionDialogConfigActionValue = null;
  public label = '';

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {
    this.label = this.data.label;
    this._initValues(this.data.values);
  }

  public close(data = null) {
    this.dialogRef.close(data);
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _initValues(values) {
    if (isArray(values)) {
      this.setOptions(values);
    } else if (isFunction(values)) {
      this._initValues(values());
    } else if (isObject(values)) {
      this.data.values
        .pipe(
          take(1),
          takeUntil(this._destroy$)
        )
        .subscribe(options => {
          this.setOptions(options);
          this._cdRef.markForCheck();
        });
    }
  }
  private setOptions(options) {
    this.options = options;

    if (this.options.length) {
      this.selectedOption = this.options[0];
    }
  }
}
