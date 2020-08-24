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
import { FsBadgeModule } from '@firestitch/badge';
import { FsFormModule } from '@firestitch/form';
import { FsAutocompleteModule } from '@firestitch/autocomplete';

import { SelectDialogComponent } from './components/select-dialog/select-dialog.component';
import { SelectionDialogComponent } from './components/selection-dialog/selection-dialog.component';
import { AutocompleteDialogComponent } from './components/autocomplete-dialog/autocomplete-dialog.component';
import { SelectionDialog } from './services/selection-dialog.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatTooltipModule,

    FsSelectButtonModule,
    FsAutocompleteModule,
    FsBadgeModule,
    FsFormModule,
  ],
  entryComponents: [
    SelectionDialogComponent,
    SelectDialogComponent,
    AutocompleteDialogComponent,
  ],
  declarations: [
    SelectionDialogComponent,
    SelectDialogComponent,
    AutocompleteDialogComponent,
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
