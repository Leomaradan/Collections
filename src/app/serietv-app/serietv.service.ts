import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { SerieTV } from './serietv';
import { CommonsService, CommonsResponse } from '../commons';


@Injectable()
export class SerieTVService extends CommonsService<SerieTV> {
    constructor(http: Http) { 
        super();
        this.http = http;
        this.setUrl('SerieTV');
    }
        
    getItemById(id: number): Promise<SerieTV> {
        return super.getItemById(id).then(serietv => {SerieTV.addVolumesList(serietv); return serietv;})
    }
    
    getItemsByFormat(format: string, page: number = 0, order: string = null): Promise<CommonsResponse<SerieTV>> {
        return this.getItemsByFilter(format, 'format', page, order);
    }        
    
    getAllItems(page: number = 0): Promise<CommonsResponse<SerieTV>> {    
        return super.getAllItems(page).then(seriestv => {SerieTV.addVolumesLists(seriestv.data); return seriestv;});
    }    
    
    recallUrl(page: number, order: string): Promise<CommonsResponse<SerieTV>> {
        return super.recallUrl(page, order).then(seriestv => {SerieTV.addVolumesLists(seriestv.data); return seriestv;});
    }
    
    protected getItemsByFilter(id: any, filter: string, page: number = 0, order: string = null): Promise<CommonsResponse<SerieTV>> {
        return super.getItemsByFilter(id, filter, page, order).then(seriestv => {SerieTV.addVolumesLists(seriestv.data); return seriestv;});
    }
}
