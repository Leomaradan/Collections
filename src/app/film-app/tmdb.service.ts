import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';

import { Film } from './film';

import { GathererService, Genre, Auteur } from '../commons' ;

export interface TMDBData {
    titre: string;
    couverture: string;
    genre: string;
    auteurs: string[];
    volume_max: number;
}

@Injectable()
export class TMDBService extends GathererService<Film> {
    
    urlSearch = 'https://api.themoviedb.org/3/search/movie';
    urlGather = '';
    urlGatherBase = 'https://api.themoviedb.org/3/movie/';
    
    searchTerm = 'query';
    gatherResourceTerm: null = null;
    
    timestamp: null = null;
    
    paramsGather = {'append_to_response': 'casts'};
    
    api_name = 'api_key';
    api_key = '5ed762df1aa4aa9437cec6279233fc65';
    
    constructor(protected http: Http, protected jsonp: Jsonp) { 
        super();
    }    
    
    gatherData(current: Film, url: string): Promise<Film> {
        this.urlGather = this.urlGatherBase + url;
        return super.gatherData(current, url);
    }
    
    parseGatheredData(current: Film, data: any): Film {
        
        current.titre = data.title;
        current.couverture = 'https://image.tmdb.org/t/p/w640/' + data.poster_path;
        
        current.genre = new Genre({nom: data.genres[0].name});

        current.auteurs = [];

        let director = data.casts.crew.filter(h => h.job === 'Director');

        for (let i in director) {
            current.auteurs.push(new Auteur({nom: director[i].name}));
        }

        //current.volume_max = data.volume_max;
        
        return current;
    }
    
    parseSearch(data: any): any[] {
        let results = data.results.slice(0,10);
        
        for(let i in results) {
            results[i].thumbnail = 'https://image.tmdb.org/t/p/w640/' + results[i].poster_path;
            results[i].url = results[i].id;
        }
        
        return results;
    } 
        
    parseSearchItem(item: {title: string}): string {
        return item.title;
    }      
}