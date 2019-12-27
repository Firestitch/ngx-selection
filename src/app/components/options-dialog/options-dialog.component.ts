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
import { takeUntil } from 'rxjs/operators';

import { FsSelectionDialogConfigActionOption } from '../../interfaces/selection-dialog-config.interface';


@Component({
  templateUrl: 'options-dialog.component.html',
  styleUrls: ['options-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsDialogComponent implements OnInit, OnDestroy {
  public options: FsSelectionDialogConfigActionOption[] = [];
  public selectedOption: FsSelectionDialogConfigActionOption = null;
  public label = '';

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _cdRef: ChangeDetectorRef,
  ) {}

  public ngOnInit() {

    this.label = this.data.label;

    if (isArray(this.data.options)) {
      this.setOptions(this.data.options);
    } else if (isObject(this.data.options)) {
      this.data.options
      .pipe(
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

  public close(data = null) {
    this.dialogRef.close(data);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
