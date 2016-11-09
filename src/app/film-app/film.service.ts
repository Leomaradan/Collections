import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Film } from './film';
import { CommonsService } from '../commons';


@Injectable()
export class FilmService extends CommonsService<Film> {
    constructor(http: Http) { 
        super();
        this.http = http;
        this.setUrl('Film');
    }
    
    // GET /roman/format/:format
    getItemsByFormat(format: string): Promise<Film[]> {
        return this.getItemsByFilter(format, 'format');
    }    
}
