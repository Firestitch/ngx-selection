import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BulkDialogComponent } from './components';
import { BulkDialog } from './services';
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
    BulkDialogComponent
  ],
  declarations: [
    BulkDialogComponent,
  ]
})
export class FsBulkModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsBulkModule,
      providers: [BulkDialog]
    };
  }
}
