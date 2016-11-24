import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { SerieTV } from './serietv';
import { SerieTVService } from './serietv.service';

import { CommonsAppComponent } from '../commons/';

@Component({
    selector: 'serietv-app',
    templateUrl: '../commons/views/app.component.html',
    styleUrls: ['../commons/views/app.component.scss'],
    providers: [SerieTVService]
})
export class SerieTVAppComponent extends CommonsAppComponent<SerieTV> implements OnInit {


    appTitre: string = "Série TV";

    appUrl: string = "serietv"

    features = SerieTV.featuresList;

    constructor(public commonsService: SerieTVService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

    ngOnInit() {
        this.init(SerieTV.featuresList);
    }

    getIcon(formatValue: string) {
        let format = SerieTV.listFormat.filter(f => f.value === formatValue)[0];
        return `assets/${format.icon}.svg`;;
    }

}
