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
        return super.getItemById(id).then(manga => Manga.addVolumesList(manga))
    }
    
    getAllItems(page: number = 0): Promise<CommonsResponse<Manga>> {    
        return super.getAllItems(page).then(mangas => {Manga.addVolumesLists(mangas.data); return mangas;});
    }    
    
    protected getItemsByFilter(id: any, filter: string, page: number = 0): Promise<CommonsResponse<Manga>> {
        return super.getItemsByFilter(id, filter, page).then(mangas => {Manga.addVolumesLists(mangas.data); return mangas;});
    }
}
