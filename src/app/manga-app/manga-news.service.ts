import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

import { Manga } from './manga';

import { GathererService } from '../commons' ;

@Injectable()
export class MangaNewsService extends GathererService<Manga> {
    
    urlSearch = 'https://collection.leomaradan.com/api/bridge/manganews/search';
    urlGather = 'https://collection.leomaradan.com/api/bridge/manganews/gather'
    
    searchTerm = 'q';
    
    gatherResourceTerm = 'resourceUrl';
    
    timestamp: null;
    
    params = {
        'limit': '10',
        'f': 'autoCompleteElasticSearch'
    };
    
    constructor(protected http: Http, protected jsonp: Jsonp) { 
        super();
    }
        
    parseGatheredData(data: any): Manga {
        
        console.log(data);
        
        //let url = `http://www.manga-news.com/services.php?f=autoCompleteElasticSearch&q=${title}&limit=10&timestamp=${timestamp}`;
        /*return this.http.get(url)
            .toPromise()
            .then(response => {
                console.log(response)
            });   */
            return null;
    }
        
    parseSearchItem(item: {title: string}) : string {
        return item.title;
    }
    
}

