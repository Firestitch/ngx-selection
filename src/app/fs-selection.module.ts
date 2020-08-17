import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';

import { FsSelectButtonModule } from '@firestitch/selectbutton';

import { OptionsDialogComponent } from './components/options-dialog/options-dialog.component';
import { SelectionDialogComponent } from './components/selection-dialog/selection-dialog.component';
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
  static forRoot(): ModuleWithProviders<FsSelectionModule> {
    return {
      ngModule: FsSelectionModule,
      providers: [SelectionDialog],
    };
  }
}
