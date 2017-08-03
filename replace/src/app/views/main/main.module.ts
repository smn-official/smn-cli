import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {MainComponent} from './main.component';
import {MainRoutingModule} from './main-routing.module';
import {SharedModule} from '../../shared.module';
import {HomeModule} from './home/home.module';

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        MainRoutingModule,
        SharedModule,
        HomeModule
    ],
    providers: [],
    bootstrap: [MainComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {
}
