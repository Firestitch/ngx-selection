import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsComponentComponent } from './components/fs-component/fs-component.component';
import { FsComponentService } from './services';
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
  exports: [
    FsComponentComponent,
  ],
  entryComponents: [
    FsComponentComponent
  ],
  declarations: [
    FsComponentComponent,
  ]
})
export class FsComponentModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FsComponentModule,
      providers: [FsComponentService]
    };
  }
}
