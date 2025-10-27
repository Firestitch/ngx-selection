import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

import { isArray, isObject } from 'lodash-es';

import { FsSelectionDialogConfigActionValue } from '../../interfaces/selection-dialog-config.interface';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatButton } from '@angular/material/button';

@Component({
    templateUrl: './select-dialog.component.html',
    styleUrls: ['./select-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        MatFormField,
        MatSelect,
        MatOption,
        MatDialogActions,
        MatButton,
    ],
})
export class SelectDialogComponent implements OnInit, OnDestroy {
  dialogRef = inject<MatDialogRef<SelectDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  private _cdRef = inject(ChangeDetectorRef);

  public options: FsSelectionDialogConfigActionValue[] = [];
  public selectedOption: FsSelectionDialogConfigActionValue = null;
  public label = '';

  private _destroy$ = new Subject();

  public ngOnInit() {
    this.label = this.data.label;
    this._initValues(this.data.values);
  }

  public close(data = null) {
    this.dialogRef.close(data);
  }


  public continue(): void {
    this.close(this.selectedOption);
  }

  public ngOnDestroy() {
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  private _initValues(values) {
    if (isArray(values)) {
      this._setOptions(values);
    } else if (typeof values === 'function') {
      this._initValues(values());
    } else if (isObject(values)) {
      this.data.values
        .pipe(
          take(1),
          takeUntil(this._destroy$),
        )
        .subscribe((options) => {
          this._setOptions(options);
          this._cdRef.markForCheck();
        });
    }
  }

  private _setOptions(options) {
    this.options = options;

    if (this.options.length) {
      this.selectedOption = this.options[0];
    }
  }
}
