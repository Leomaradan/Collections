import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleterService } from 'ng2-completer';

import { Bd } from './bd';
import { BdService } from './bd.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'bd-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.scss'],
    providers: [BdService]
})
export class BdFormComponent extends CommonsFormComponent<Bd> implements OnInit {

    //roman: Roman;
    serieDisplay: string;
    serieVolumeMax: number = 1;    
    
    features = Bd.featuresDetails;
    
    appUrl: string = "bd"    
    appTitre: string = "Bd";
    
    constructor(public commonsService: BdService, 
                protected route: ActivatedRoute, 
                protected router: Router,
                protected completerService: CompleterService) {
        super();
    }

    initNewItem() {
        this.item = <any>new Bd({
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
