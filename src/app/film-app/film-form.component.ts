import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompleterService } from 'ng2-completer';

import { Film } from './film';
import { FilmService } from './film.service';
import { TMDBService } from './tmdb.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'film-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.scss'],
    providers: [FilmService, TMDBService]
})
export class FilmFormComponent extends CommonsFormComponent<Film> implements OnInit {

    //roman: Roman;
    serieDisplay: string;
    serieVolumeMax: number = 1;
    features = Film.featuresForm;
    listFormat = Film.listFormat;
    
    appUrl: string = "film";
    appTitre: string = "Films";

    constructor(public commonsService: FilmService, 
                protected route: ActivatedRoute, 
                protected router: Router,
                protected completerService: CompleterService,
                public gathererService: TMDBService) {
        super();
    }
    
    initNewItem() {
        this.item = <any>new Film({
            titre: '',
            serie: null,
            genre: null,
            volume: null,
            auteurs: [],
            format: []
        });

        this.initLists();    
    }    

    ngOnInit() {
        this.init();
    }

}
