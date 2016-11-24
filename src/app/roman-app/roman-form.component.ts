import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleterService } from 'ng2-completer';

import { Roman } from './roman';
import { RomanService } from './roman.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'roman-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.scss'],
    providers: [RomanService]
})
export class RomanFormComponent extends CommonsFormComponent<Roman> implements OnInit {

    //roman: Roman;
    serieDisplay: string;
    serieVolumeMax: number = 1;    
    
    features = Roman.featuresDetails;
    
    appUrl: string = "roman"    
    appTitre: string = "Romans";
    
    constructor(public commonsService: RomanService, 
                protected route: ActivatedRoute, 
                protected router: Router,
                protected completerService: CompleterService) {
        super();
    }

    initNewItem() {
        this.item = <any>new Roman({
            titre: '',
            serie: null,
            genre: null,
            volume: null,
            auteurs: []
        });

        this.initLists();
    }

    ngOnInit() {
        this.init();
    }

}
