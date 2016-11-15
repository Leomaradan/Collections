import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Film } from './film';
import { FilmService } from './film.service';

import { CommonsAppComponent } from '../commons/';

@Component({
    selector: 'film-app',
    templateUrl: '../commons/views/app.component.html',
    styleUrls: ['../commons/views/app.component.css'],
    providers: [FilmService]
})
export class FilmAppComponent extends CommonsAppComponent<Film> implements OnInit {

    appTitre: string = "Films";

    appUrl: string = "film"

    features = Film.featuresList;

    constructor(protected commonsService: FilmService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

    ngOnInit() {

        this.route.params.forEach((params: Params) => {
            let genre = +params['genre'];
            let serie = +params['serie'];
            let auteur = +params['auteur'];
            let format = params['format'];
            
            this.loading++;

            if(genre) {
                this.commonsService.getItemsByGenre(genre).then(films => {this.items = films; this.loading--});
                this.filterBy = "genre";
                this.cloneObject = {genre: genre};
            } else if (serie) {
                this.commonsService.getItemsBySerie(serie).then(films => {this.items = films; this.loading--});
                this.filterBy = "série";
                this.cloneObject = {serie: serie};
            } else if (auteur) {
                this.commonsService.getItemsByAuteur(auteur).then(films => {this.items = films; this.loading--});
                this.filterBy = "auteur";
                this.cloneObject = {auteur: auteur};
            } else if (format) {
                this.commonsService.getItemsByFormat(format).then(films => {this.items = films; this.loading--});
                this.filterBy = "format";
                this.cloneObject = {format: format};
            } else {
              this.commonsService.getAllItems().then(films => {this.items = films; this.loading--});
              this.filterBy = null;
            }

        });

    }

}
