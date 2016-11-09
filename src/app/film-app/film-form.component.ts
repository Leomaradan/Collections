import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Film } from './film';
import { FilmService } from './film.service';

import { CommonsFormComponent } from '../commons';

@Component({
    selector: 'film-form',
    templateUrl: '../commons/form.component.html',
    styleUrls: ['../commons/form.component.css'],
    providers: [FilmService]
})
export class FilmFormComponent extends CommonsFormComponent<Film> implements OnInit {

    //roman: Roman;
    serieDisplay: string;
    serieVolumeMax: number = 1;    
    
    listFormat = [
        { value: 'dvd', display: 'DVD' },
        { value: 'blu-ray', display: 'Blu-Ray' },
        { value: 'blu-ray 3d', display: 'Blu-Ray 3D' },
        { value: 'blu-ray 4k', display: 'Blu-Ray 4K' }
    ];    
    
    constructor(protected commonsService: FilmService, protected route: ActivatedRoute) {
        super();
        this.features = ["serie", "volume", "format"];
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            if (id) {
                this.initItem(id);
            } else {
                this.item = <any>new Film();
                this.serieSwitcher = "null";
            }
            
            //this.listFormat = FilmFormat.names();

        });
    }

}
