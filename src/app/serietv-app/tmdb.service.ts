
import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { SerieTV } from './serietv';

import { Genre, Auteur, GathererModalObject, GathererService, GathererBind } from '../commons';

/*export interface TMDBData {
    titre: string;
    couverture: string;
    genre: string;
    auteurs: string[];
    volume_max: number;
}*/

@Injectable()
export class TMDBServiceTV extends GathererService<SerieTV> {


    constructor(protected http: Http, protected jsonp: Jsonp, protected modalService: NgbModal) {
        super();
        //this.urlSearch += 'tv';
        //this.urlGatherBase += 'tv/';
    }

    urlSearch = 'https://api.themoviedb.org/3/search/tv';
    urlGather = '';
    urlGatherBase = 'https://api.themoviedb.org/3/tv/';

    searchTerm = 'query';
    gatherResourceTerm: null = null;

    timestamp: null = null;

    paramsGather = { 'append_to_response': 'credits' };

    api_name = 'api_key';
    api_key = '5ed762df1aa4aa9437cec6279233fc65';

    parseGatheredData(current: SerieTV, data: any): GathererModalObject<SerieTV> {
        
        //number_of_seasons 6
        
        let item: GathererBind[] = [];
        //console.log(data);
        item.push(this.makeBind('Titre', 'titre', current.titre, data.name));      
        current.titre = data.name;
        
        item.push(this.makeBind('Couverture', 'couverture', current.couverture, 'https://image.tmdb.org/t/p/w640' + data.poster_path));  
        current.couverture = 'https://image.tmdb.org/t/p/w640' + data.poster_path;
        
        item.push(this.makeBind('Genre', 'genre', current.genre.nom, data.genres[0].name));
        current.genre = new Genre({nom: data.genres[0].name});

        
        //let auteurs_list: string[] = current.auteurs.map(a => a.nom);
        //current.auteurs = [];

        //let director = data.credits.crew.filter(h => h.job === 'Executive Producer');

        /*for (let i in director) {
            current.auteurs.push(new Auteur({nom: director[i].name}));
        }
        
        let auteurs_new_list: string[] = current.auteurs.map(a => a.nom);
        item.push({ override: false, label: 'Auteur(s)', field: 'auteurs', oldValue: auteurs_list.join(', '), newValue: auteurs_new_list.join(', ')});
*/
        //current.volume_max = data.volume_max;
        item.push(this.makeBind('Nombre de saisons', 'volume_max', current.volume_max, data.number_of_seasons));
        current.volume_max = data.number_of_seasons;
        
        return { data: current, bind: item };
    
    }

    gatherData(current: SerieTV, url: string): Promise<SerieTV> {
        this.urlGather = this.urlGatherBase + url;
        return super.gatherData(current, url);
    }



    parseSearch(data: any): any[] {
        let results = data.results.slice(0, 20);

        for (let i in results) {

            if (results[i].title == undefined && results[i].name !== undefined) {
                results[i].title = results[i].name;
            }

            if (results[i].poster_path !== null) {
                results[i].thumbnail = 'https://image.tmdb.org/t/p/w640/' + results[i].poster_path;
            }
            results[i].url = results[i].id;
        }

        return results;
    }

    parseSearchItem(item: { title: string }): string {
        return item.title;
    }
}