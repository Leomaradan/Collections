import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Film } from './film';
import { FilmService } from './film.service';

import { CommonsDetailsComponent } from '../commons/';

@Component({
    selector: 'film-details',
    templateUrl: '../commons/views/details.component.html',
    styleUrls: ['../commons/views/details.component.css'],
    providers: [FilmService]
})
export class FilmDetailsComponent extends CommonsDetailsComponent<Film> implements OnInit {

    features = Film.featuresDetails;
    
    appUrl: string = "film"    
    appTitre: string = "Films";

    constructor(protected commonsService: FilmService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.commonsService.getItemById(id)
                .then(data => {
                    this.item = data;
                });
        });
    }

}
