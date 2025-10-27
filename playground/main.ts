import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsExampleModule } from '@firestitch/example';
import { ToastrModule } from 'ngx-toastr';
import { FsMessageModule } from '@firestitch/message';
import { FsCheckboxGroupModule } from '@firestitch/checkboxgroup';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FormsModule, FsExampleModule.forRoot(), ToastrModule.forRoot(), FsMessageModule.forRoot(), FsCheckboxGroupModule),
        provideAnimations(),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));

