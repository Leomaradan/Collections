import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Film } from './film';
import { CommonsService } from '../commons';


@Injectable()
export class FilmService extends CommonsService<Film> {
    
    //pagination = 3;
    
    constructor(http: Http) { 
        super();
        this.http = http;
        this.setUrl('Film');
    }
    
    // GET /roman/format/:format
    getItemsByFormat(format: string, page: number = 0): Promise<{data: Film[], pagination: any}> {
        return this.getItemsByFilter(format, 'format', page);
    }    
     
}
