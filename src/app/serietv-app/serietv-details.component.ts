import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { SerieTV } from './serietv';
import { SerieTVService } from './serietv.service';

import { CommonsDetailsComponent } from '../commons/';


@Component({
    selector: 'serietv-details',
    templateUrl: '../commons/views/details.component.html',
    styleUrls: ['../commons/views/details.component.scss'],
    providers: [SerieTVService]
})
export class SerieTVDetailsComponent extends CommonsDetailsComponent<SerieTV> implements OnInit {

    features = SerieTV.featuresDetails;

    appUrl: string = "serietv"
    appTitre: string = "Série TV";

    constructor(public commonsService: SerieTVService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }


    ngOnInit() {
        this.init();
    }

    getIcon(formatValue: string) {
        let format = SerieTV.listFormat.filter(f => f.value === formatValue)[0];
        return `assets/${format.icon}.svg`;;
    }

}
