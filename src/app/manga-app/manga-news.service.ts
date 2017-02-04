import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Manga } from './manga';

import { GathererService, Genre, Auteur, GathererModalObject, GathererBind } from '../commons' ;

export interface MangaNewsData {
    titre: string;
    couverture: string;
    genre: string;
    auteurs: string[];
    volume_max: number;
    stoppee: boolean;
}

@Injectable()
export class MangaNewsService extends GathererService<Manga> {
    
    urlSearch = 'https://collection.leomaradan.com/api/bridge/manganews/search';
    urlGather = 'https://collection.leomaradan.com/api/bridge/manganews/gather'
    
    searchTerm = 'q';
    
    gatherResourceTerm = 'resourceUrl';
    
    timestamp: null;
    
    paramsSearch = {
        'limit': '10',
        'f': 'autoCompleteElasticSearch'
    };
    
    constructor(protected http: Http, protected jsonp: Jsonp, protected modalService: NgbModal) { 
        super();
    }
        
    parseSearch(data: any[]): any[] {
        for(let i in data) {
            data[i].tag = (data[i].category == 'serie') ? 'Manga' : 'Anime';
        }
        
        return data;
    }     
    
    parseGatheredData(current: Manga, data: MangaNewsData): GathererModalObject<Manga> {
        
        let item: GathererBind[] = [];
        //console.log(data);
        item.push(this.makeBind('Titre', 'titre', current.titre, data.titre));
        current.titre = data.titre;
        
        item.push(this.makeBind('Couverture', 'couverture', current.couverture, data.couverture));
        current.couverture = data.couverture;
        
        item.push(this.makeBind('Genre', 'genre', (current.genre !== null) ? current.genre.nom : '', data.genre));
        current.genre = new Genre({nom: data.genre});

        
        let auteurs_list: string[] = current.auteurs.map(a => a.nom);
        current.auteurs = [];

        for (let i in data.auteurs) {
            current.auteurs.push(new Auteur({nom: data.auteurs[i]}));
        }
        item.push(this.makeBind('Auteur(s)', 'auteurs', auteurs_list, data.auteurs));
        
        item.push(this.makeBind('Volume max', 'volume_max', current.volume_max, data.volume_max));
        current.volume_max = data.volume_max;
        
        item.push(this.makeBind('Série terminée', 'serie_termine', current.serie_termine, data.stoppee));
        current.serie_termine = data.stoppee;
        
        return { data: current, bind: item };
    }
        
    parseSearchItem(item: {title: string}) : string {
        return item.title;
    }
    
}

