import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Film } from './film';
import { FilmService } from './film.service';

import { CommonsAppComponent } from '../commons/';

@Component({
    selector: 'film-app',
    templateUrl: '../commons/views/app.component.html',
    styleUrls: ['../commons/views/app.component.scss'],
    providers: [FilmService]
})
export class FilmAppComponent extends CommonsAppComponent<Film> implements OnInit {

    appTitre: string = "Films";

    appUrl: string = "film"

    features = Film.featuresList;

    constructor(public commonsService: FilmService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

    ngOnInit() {

        this.init(Film.featuresList);

        /*this.route.params.forEach((params: Params) => {
            let genre = +params['genre'];
            let serie = +params['serie'];
            let auteur = +params['auteur'];
            let format = params['format'];
            let page = (+params['page']) ? +params['page'] : 1;
            
            this.loading++;
            
            this.features = Film.featuresList.slice();

            if(genre) {
                this.commonsService.getItemsByGenre(genre, page).then(films => {this.items = films; this.loading--});
                this.filterBy = "genre";
                this.cloneObject = {genre: genre};
            } else if (serie) {
                this.commonsService.getItemsBySerie(serie, page).then(films => {this.items = films; this.loading--});
                this.filterBy = "série";
                this.features.push('volume');
                this.cloneObject = {serie: serie};
            } else if (auteur) {
                this.commonsService.getItemsByAuteur(auteur, page).then(films => {this.items = films; this.loading--});
                this.filterBy = "auteur";
                this.cloneObject = {auteur: auteur};
            } else if (format) {
                this.commonsService.getItemsByFormat(format, page).then(films => {this.items = films; this.loading--});
                this.filterBy = "format";
                this.cloneObject = {format: format};
            } else {
              this.commonsService.getAllItems(page).then(films => {this.items = films; this.loading--});
              this.filterBy = null;
            }

        });*/

    }
    
    getIcon(formatValue: string) {
        let format = Film.listFormat.filter(f => f.value === formatValue)[0];
        return `assets/${format.icon}.svg`;;
    }    

}
