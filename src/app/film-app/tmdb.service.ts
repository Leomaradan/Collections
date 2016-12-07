import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Film } from './film';

import { GathererService, Genre, Auteur, GathererModalObject, GathererBind } from '../commons' ;

/*export interface TMDBData {
    titre: string;
    couverture: string;
    genre: string;
    auteurs: string[];
    volume_max: number;
}*/

@Injectable()
export class TMDBServiceFilm extends GathererService<Film> {

    
    constructor(protected http: Http, protected jsonp: Jsonp, protected modalService: NgbModal) { 
        super();
        //this.urlSearch += 'movie';
        //this.urlGatherBase += 'movie/';
    }    
    
    urlSearch = 'https://api.themoviedb.org/3/search/movie';
    urlGather = '';
    urlGatherBase = 'https://api.themoviedb.org/3/movie/';
    
    searchTerm = 'query';
    gatherResourceTerm: null = null;
    
    timestamp: null = null;
    
    paramsGather = {'append_to_response': 'credits'};
    
    api_name = 'api_key';
    api_key = '5ed762df1aa4aa9437cec6279233fc65';       
    
    parseGatheredData(current: Film, data: any): GathererModalObject<Film> {
        
        let item: GathererBind[] = [];
        //console.log(data);
        item.push(this.makeBind('Titre', 'titre', current.titre, data.title));      
        current.titre = data.title;
        
        item.push(this.makeBind('Couverture', 'couverture', current.couverture, 'https://image.tmdb.org/t/p/w640' + data.poster_path));     
        current.couverture = 'https://image.tmdb.org/t/p/w640' + data.poster_path;
        
        item.push(this.makeBind('Genre', 'genre', current.genre.nom, data.genres[0].name));  
        current.genre = new Genre({nom: data.genres[0].name});

        
        let auteurs_list: string[] = current.auteurs.map(a => a.nom);
        current.auteurs = [];

        let director = data.credits.crew.filter(h => h.job === 'Director');

        for (let i in director) {
            current.auteurs.push(new Auteur({nom: director[i].name}));
        }
        
        let auteurs_new_list: string[] = current.auteurs.map(a => a.nom);
        item.push(this.makeBind('Auteur(s)', 'auteurs', auteurs_list, auteurs_new_list)); 

        //current.volume_max = data.volume_max;
        
        return { data: current, bind: item };
    }
    
    
   gatherData(current: Film, url: string): Promise<Film> {
        this.urlGather = this.urlGatherBase + url;
        return super.gatherData(current, url);
    }
    

    
    parseSearch(data: any): any[] {
        let results = data.results.slice(0,20);
        
        for(let i in results) {
            
            if(results[i].title == undefined && results[i].name !== undefined) {
                results[i].title = results[i].name;
            }
            
            if(results[i].poster_path !== null) {
                results[i].thumbnail = 'https://image.tmdb.org/t/p/w640/' + results[i].poster_path;
            }
            results[i].url = results[i].id;
        }
        
        return results;
    } 
        
    parseSearchItem(item: {title: string}): string {
        return item.title;
    }        
}