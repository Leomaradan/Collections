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
    
    /*getAllItems(page: number = 0): Promise<CommonsResponse<Manga>> {    
        return super.getAllItems(page).then(mangas => {Manga.addVolumesLists(mangas.data); return mangas;});
    }    
    
    recallUrl(page: number, order: string): Promise<CommonsResponse<Manga>> {
        return super.recallUrl(page, order).then(mangas => {Manga.addVolumesLists(mangas.data); return mangas;});
    }*/
    
    protected getItems(url: string, page: number): Promise<CommonsResponse<Manga>> {
        return super.getItems(url, page).then(mangas => {Manga.addVolumesLists(mangas.data); return mangas;});
    }
    
    /*protected getItemsByFilter(id: any, filter: string, page: number = 0, order: string = null): Promise<CommonsResponse<Manga>> {
        return super.getItemsByFilter(id, filter, page, order).then(mangas => {Manga.addVolumesLists(mangas.data); return mangas;});
    }*/
}
