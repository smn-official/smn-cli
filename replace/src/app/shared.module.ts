import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';

import {SMNUIModule, UiToolbarService} from 'ng-smn-ui';
import {ApiService} from './core/api/api.service';

@NgModule({
    exports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        SMNUIModule,
        RouterModule
    ],
    providers: [UiToolbarService, ApiService]
})
export class SharedModule {
}
