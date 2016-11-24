import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleterService } from 'ng2-completer';

import { Manga } from './manga';
import { MangaService } from './manga.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'manga-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.scss'],
    providers: [MangaService]
})
export class MangaFormComponent extends CommonsFormComponent<Manga> implements OnInit {

    
    features = Manga.featuresDetails;
       
    appUrl: string = "manga"    
    appTitre: string = "Manga";
    
    constructor(public commonsService: MangaService, 
                protected route: ActivatedRoute, 
                protected router: Router,
                protected completerService: CompleterService) {
        super();
    }
    
    initNewItem() {
        this.item = <any>new Manga({
            titre: '',
            genre: null,
            volume_max: 1,
            volumes:  [],
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
