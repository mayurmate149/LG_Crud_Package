import { NgModule, ModuleWithProviders } from '@angular/core';
import { PackageComponent } from './components/package';
import { PackageService } from './components/package.service';
import { PackageModel } from './components/package.model';
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
 
@NgModule({
    imports: [
        HttpModule,
        BrowserModule
    ],
    declarations: [
        PackageComponent
    ],
    exports: [
        PackageComponent
    ]
})
export class LgCrudModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: LgCrudModule,
            providers: [PackageService, PackageModel]
        };
    }
}