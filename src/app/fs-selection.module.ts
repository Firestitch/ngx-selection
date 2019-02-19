import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatDialogModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTooltipModule
} from '@angular/material';

import { FsSelectButtonModule } from '@firestitch/selectbutton';

import { OptionsDialogComponent, SelectionDialogComponent } from './components/';
import { SelectionDialog } from './services/selection-dialog.service';


@NgModule({
  imports: [
    // ng
    CommonModule,
    FormsModule,
    FsSelectButtonModule,

    // material
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,
  ],
  entryComponents: [
    SelectionDialogComponent,
    OptionsDialogComponent,
  ],
  declarations: [
    SelectionDialogComponent,
    OptionsDialogComponent,
  ]
})
export class FsSelectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsSelectionModule,
      providers: [SelectionDialog],
    };
  }
}
