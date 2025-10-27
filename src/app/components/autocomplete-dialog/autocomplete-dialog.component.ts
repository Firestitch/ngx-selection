import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

import { FsAutocompleteComponent, FsAutocompleteModule } from '@firestitch/autocomplete';

import { Subject } from 'rxjs';

import { FsSelectionDialogConfigActionValue } from '../../interfaces/selection-dialog-config.interface';
import { FormsModule } from '@angular/forms';
import { FsFormModule } from '@firestitch/form';
import { CdkScrollable } from '@angular/cdk/scrolling';
import { FsBadgeModule } from '@firestitch/badge';
import { MatButton } from '@angular/material/button';


@Component({
    templateUrl: './autocomplete-dialog.component.html',
    styleUrls: ['./autocomplete-dialog.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        FormsModule,
        FsFormModule,
        MatDialogTitle,
        CdkScrollable,
        MatDialogContent,
        FsAutocompleteModule,
        FsBadgeModule,
        MatDialogActions,
        MatButton,
    ],
})
export class AutocompleteDialogComponent implements OnInit, OnDestroy {
  dialogRef = inject<MatDialogRef<AutocompleteDialogComponent>>(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);


  @ViewChild(FsAutocompleteComponent, { static: false })
  public autocomplete: FsAutocompleteComponent;

  public options: FsSelectionDialogConfigActionValue[] = [];
  public selected: FsSelectionDialogConfigActionValue = null;
  public label = '';
  public placeholder: string = '';

  private _destroy$ = new Subject();

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
    this._destroy$.next(null);
    this._destroy$.complete();
  }

  public fetch = (keyword: string) => {
    return this.data.values(keyword);
  };

}
