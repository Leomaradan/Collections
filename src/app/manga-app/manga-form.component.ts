import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleterService } from 'ng2-completer';

import { Manga } from './manga';
import { MangaService } from './manga.service';
import { MangaNewsService } from './manga-news.service';

import { CommonsFormComponent } from '../commons';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'manga-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.scss'],
    providers: [MangaService, MangaNewsService]
})
export class MangaFormComponent extends CommonsFormComponent<Manga> implements OnInit {

    
    features = Manga.featuresForm;
       
    appUrl: string = "manga"    
    appTitre: string = "Manga";
        
    constructor(public commonsService: MangaService, 
                protected route: ActivatedRoute, 
                protected router: Router,
                protected completerService: CompleterService, 
                public gathererService: MangaNewsService) {
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
    
    //queryGatherer(text$: Observable<string>) {
         
    //}    

}
