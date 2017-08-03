import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiCookie, UiToolbarService} from 'ng-smn-ui';
import {ApiService} from '../../core/api/api.service';

import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
    title: String;
    menuOpen: boolean;
    readyToGo: boolean;

    constructor(private toolbarService: UiToolbarService, private titleService: Title, private api: ApiService) {
        this.toolbarService.change.subscribe(title => this.title = title);
    }

    ngOnInit() {
        this.titleService.setTitle('{{{projectname-pascal}}}');
        this.toolbarService.set('{{{projectname-pascal}}}');

        this.menuOpen = UiCookie.get('NavDrawerPersistent') === 'true';

        this.toolbarService.registerMainToolbar(document.getElementById('app-header'));

        this.api.init({
            SMNAuthApiRoutes: environment.SMNAuthApiRoutes,
            headers: {
                'Authentication': UiCookie.get('token_demo')
            }
        }).then(() => this.readyToGo = true);
    }
}
