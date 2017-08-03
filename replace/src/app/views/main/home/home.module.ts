import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {HomeComponent} from './home.component';
import {SharedModule} from '../../../shared.module';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        SharedModule
    ],
    providers: [],
    bootstrap: [HomeComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {
}
