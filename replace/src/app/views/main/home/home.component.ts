import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

import {UiToolbarService} from 'ng-smn-ui';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    constructor(private toolbarService: UiToolbarService, private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Home');
        this.toolbarService.set('Home');
    }
}
