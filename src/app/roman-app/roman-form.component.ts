import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Roman } from './roman';
import { RomanService } from './roman.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'roman-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.css'],
    providers: [RomanService]
})
export class RomanFormComponent extends CommonsFormComponent<Roman> implements OnInit {

    //roman: Roman;
    serieDisplay: string;
    serieVolumeMax: number = 1;    
    
    features = Roman.featuresDetails;
    
    appUrl: string = "roman"    
    appTitre: string = "Romans";
    
    constructor(protected commonsService: RomanService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            if (id) {
                this.initItem(id);
            } else {
                this.item = <any>new Roman({
                    titre: '',
                    serie: null,
                    genre: null,
                    volume: null,
                    auteurs: []
                });
                this.serieSwitcher = "null";
                this.initLists();
            }

        });
    }

}
