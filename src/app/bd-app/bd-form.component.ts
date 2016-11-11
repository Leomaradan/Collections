import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Bd } from './bd';
import { BdService } from './bd.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'bd-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.css'],
    providers: [BdService]
})
export class BdFormComponent extends CommonsFormComponent<Bd> implements OnInit {

    //roman: Roman;
    serieDisplay: string;
    serieVolumeMax: number = 1;    
    
    features = Bd.featuresDetails;
    
    appUrl: string = "bd"    
    appTitre: string = "Bd";
    
    constructor(protected commonsService: BdService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            if (id) {
                this.initItem(id);
            } else {
                this.item = <any>new Bd();
                this.serieSwitcher = "null";
            }

        });
    }

}
