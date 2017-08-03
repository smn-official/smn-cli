import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedModule} from './shared.module';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {NotFoundComponent} from './views/not-found/not-found.component';
import {MainModule} from './views/main/main.module';

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        MainModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
