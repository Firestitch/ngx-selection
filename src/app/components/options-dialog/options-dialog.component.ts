import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { SelectionDialogConfigActionOption } from '../../interfaces/selection-dialog-config.interface';


@Component({
  templateUrl: 'options-dialog.component.html'
})
export class OptionsDialogComponent implements OnInit {
  public options: SelectionDialogConfigActionOption[] = [];
  public selectedOption: SelectionDialogConfigActionOption = null;
  public label = '';
  constructor( public dialogRef: MatDialogRef<OptionsDialogComponent>,
               @Inject(MAT_DIALOG_DATA) public data) {
  }

  public ngOnInit() {
    this.options = this.data.options;
    this.label = this.data.label;

    if (this.options.length) {
      this.selectedOption = this.options[0];
    }
  }

  public close(data = null) {
    this.dialogRef.close(data);
  }


}
