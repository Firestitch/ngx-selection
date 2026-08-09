import { ModuleWithProviders, NgModule } from '@angular/core';


// THIS MODULE ONLY FOR BACKWARD COMPATIBILITY
@NgModule({
  imports: [],
  exports: [],
})
export class FsSelectionModule {
  public static forRoot(): ModuleWithProviders<FsSelectionModule> {
    return {
      ngModule: FsSelectionModule,
      providers: [],
    };
  }
}
