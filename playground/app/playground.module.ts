import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FsExampleModule } from '@firestitch/example';
import { FsMessageModule } from '@firestitch/message';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';

import { FsBulkModule } from 'fs-bulk';

import { AppMaterialModule } from './material.module';
import {
ExampleComponent,
ExamplesComponent } from './components';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';


const routes: Routes = [
  { path: '', component: ExamplesComponent },
];

@NgModule({
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    FsBulkModule.forRoot(),
    BrowserAnimationsModule,
    AppMaterialModule,
    FormsModule,
    FsExampleModule.forRoot(),
    ToastrModule.forRoot(),
    FsMessageModule.forRoot(),
    FsCheckboxGroupModule,
    RouterModule.forRoot(routes),
  ],
  entryComponents: [
  ],
  declarations: [
    AppComponent,
    ExamplesComponent,
    ExampleComponent
  ],
  providers: [
  ],
})
export class PlaygroundModule {
}
