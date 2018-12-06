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

import { SelectionDialogComponent } from './components/selection-dialog/selection-dialog.component';
import { SelectionDialog } from './services/selection-dialog.service';


@NgModule({
  imports: [
    // ng
    CommonModule,
    FormsModule,

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
  ],
  declarations: [
    SelectionDialogComponent,
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
