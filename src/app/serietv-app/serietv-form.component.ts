import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleterService } from 'ng2-completer';

import { SerieTV } from './serietv';
import { SerieTVService } from './serietv.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'serietv-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.scss'],
    providers: [SerieTVService]
})
export class SerieTVFormComponent extends CommonsFormComponent<SerieTV> implements OnInit {

    
    features = SerieTV.featuresDetails;
       
    appUrl: string = "serietv"    
    appTitre: string = "Série TV";
    
    listFormat = SerieTV.listFormat;
    
    constructor(public commonsService: SerieTVService, 
                protected route: ActivatedRoute, 
                protected router: Router,
                protected completerService: CompleterService) {
        super();
    }
    
    initNewItem() {
        this.item = <any>new SerieTV({
            titre: '',
            genre: null,
            volume_max: 1,
            volumes:  [],
            format: [],
            listVolumeMax: [1],
            auteurs: []
        });
        this.initLists();

    }

    ngOnInit() {
        this.init();
    }
    
    volumeMaxChanged() {
        if (this.item.volume_max > this.item.listVolumeMax.length) {
            for (let i = this.item.listVolumeMax.length + 1; i <= this.item.volume_max; i++) {
                this.item.listVolumeMax.push(i);
            }
        } else {
            this.item.listVolumeMax.splice(this.item.volume_max, this.item.listVolumeMax.length - this.item.volume_max);
        }
    }      

}
