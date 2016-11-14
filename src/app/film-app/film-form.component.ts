import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CompleterService, CompleterData } from 'ng2-completer';

import { Film } from './film';
import { FilmService } from './film.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'film-form',
    templateUrl: '../commons/views/form.component.html',
    styleUrls: ['../commons/views/form.component.css'],
    providers: [FilmService]
})
export class FilmFormComponent extends CommonsFormComponent<Film> implements OnInit {

    //roman: Roman;
    serieDisplay: string;
    serieVolumeMax: number = 1;
    features = Film.featuresDetails;
    
    appUrl: string = "film";
    appTitre: string = "Films";

    constructor(protected commonsService: FilmService, 
                protected route: ActivatedRoute, 
                protected router: Router,
                protected completerService: CompleterService) {
        super();
    }

    ngOnInit() {
        console.log(this.route.params);
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            console.log(params);
            if (!id) {
                this.item = <any>new Film({
                    titre: '',
                    serie: null,
                    genre: null,
                    volume: null,
                    auteurs: [],
                    format: []
                });
                
	/*id: number;
	titre: string;
	serie?: Serie;
	genre: Genre;
	volume?: number;
	auteurs: Auteur[];
        format: string[];*/                
                
                this.serieSwitcher = "null"; 
                this.initLists();               
            } else {
                this.initItem(id);
            }

            //this.listFormat = FilmFormat.names();

        });
    }

}
