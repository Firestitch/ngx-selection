import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SelectionDialogComponent } from './components';
import { SelectionDialog } from './services';
import { FormsModule } from '@angular/forms';
import {  MatDialogModule,
          MatButtonModule,
          MatSelectModule,
          MatIconModule,
          MatCheckboxModule,
          MatMenuModule,
          MatTooltipModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  entryComponents: [
    SelectionDialogComponent
  ],
  declarations: [
    SelectionDialogComponent,
  ]
})
export class FsSelectionModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsSelectionModule,
      providers: [SelectionDialog]
    };
  }
}
