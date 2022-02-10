import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FsAutocompleteComponent } from '@firestitch/autocomplete';

import { Subject } from 'rxjs';

import { FsSelectionDialogConfigActionValue } from '../../interfaces/selection-dialog-config.interface';


@Component({
  templateUrl: 'autocomplete-dialog.component.html',
  styleUrls: ['autocomplete-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteDialogComponent implements OnInit, OnDestroy {

  @ViewChild(FsAutocompleteComponent, { static: false })
  public autocomplete: FsAutocompleteComponent;

  public options: FsSelectionDialogConfigActionValue[] = [];
  public selected: FsSelectionDialogConfigActionValue = null;
  public label = '';
  public placeholder: string = '';

  private _destroy$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<AutocompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    // private _cdRef: ChangeDetectorRef,
  ) { }

  public ngOnInit() {
    this.label = this.data.label;

    if (this.data.placeholder) {
      this.placeholder = this.data.placeholder;
    }
  }

  public close(data = null) {
    this.dialogRef.close(data);
  }

  public displayWith = (data) => {
    return data.name;
  };

  public continue(): void {
    this.close(this.selected);
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public fetch = (keyword: string) => {
    return this.data.values(keyword);
  };

}
