import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Manga } from './manga';
import { CommonsService, CommonsResponse } from '../commons';


@Injectable()
export class MangaService extends CommonsService<Manga> {
    constructor(http: Http) { 
        super();
        this.http = http;
        this.setUrl('Manga');
    }
        
    getItemById(id: number): Promise<Manga> {
        return super.getItemById(id).then(manga => {Manga.addVolumesList(manga); return manga;})
    }
    
    protected getItems(url: string, page: number): Promise<CommonsResponse<Manga>> {
        return super.getItems(url, page).then(mangas => {Manga.addVolumesLists(mangas.data); return mangas;});
    }

}
