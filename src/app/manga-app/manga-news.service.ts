import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

import { Manga } from './manga';

import { GathererService, Genre, Auteur } from '../commons' ;

export interface MangaNewsData {
    titre: string;
    couverture: string;
    genre: string;
    auteurs: string[];
    volume_max: number;
}

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
        
    parseGatheredData(current: Manga, data: MangaNewsData): Manga {
        
        //console.log(data);
        current.titre = data.titre;
        current.couverture = data.couverture;
        
        current.genre = new Genre({nom: data.genre});

        current.auteurs = [];

        for (let i in data.auteurs) {
            current.auteurs.push(new Auteur({nom: data.auteurs[i]}));
        }
        
        current.volume_max = data.volume_max;
        
        return current;
    }
        
    parseSearchItem(item: {title: string}) : string {
        return item.title;
    }
    
}

