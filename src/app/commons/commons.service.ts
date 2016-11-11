import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import { Roman } from './roman';
import { Commons, Serie, Genre, Auteur } from '.';

export class CommonsService<T extends Commons> {

    private itemsUrl = 'api/roman';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    
    protected pagination: number = null;
    
    private urls = {
        'Roman': 'roman',
        'Film': 'film',
        'Manga': 'manga',
        'Bd': 'bd'
    };
    
    protected http: Http;

    //lastId: number = 0;

    //romans: Roman[] = [];

    setUrl(urlName: string) {
        let url = this.urls[urlName];
        this.itemsUrl = `api/${url}`;
    }

    // POST /roman
    addItem(roman: T): Promise<T> {
        return this.http
            .post(this.itemsUrl, JSON.stringify(this.filter(roman)), { headers: this.headers })
            .toPromise()
            .then(response => this.factory(response.json().data[0]));
            //.catch(this.handleError);
        //return this;
    }

    // DELETE /roman/:id
    deleteItem(roman: T): Promise<T> {
        let url = `${this.itemsUrl}/${roman.id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null);
            //.catch(this.handleError);

        //return this;
    }

    // PUT /roman/:id
    updateItem(roman: T): Promise<T> {
        let url = `${this.itemsUrl}/${roman.id}`;
        return this.http
            .put(url, JSON.stringify(this.filter(roman)), { headers: this.headers })
            .toPromise()
            .then(response => this.factory(response.json().data[0]));
            //.catch(this.handleError);
    }

    // GET /roman
    getAllItems(page: number = 0): Promise<T[]> {
        let url = this.itemsUrl;
        if (this.pagination !== null) {
            url += '?page='+page+'&pagination='+this.pagination;
        }
        return this.http.get(url)
            .toPromise()
            .then(response => this.factories(response.json().data))
            .catch(this.handleError);
    }

    // GET /roman/:id
    getItemById(id: number): Promise<T> {
        let url = `${this.itemsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => this.factory(response.json().data[0]))
            .catch(this.handleError);
    }

    // GET /roman/genre/:genre
    getItemsByGenre(genre: number): Promise<T[]> {
        return this.getItemsByFilter(genre, 'genre');
    }

    // GET /roman/serie/:serie
    getItemsBySerie(serie: number): Promise<T[]> {
        return this.getItemsByFilter(serie, 'serie');
    }

    // GET /roman/serie/:serie
    getItemsByAuteur(auteur: number): Promise<T[]> {
        return this.getItemsByFilter(auteur, 'auteur');
    }

    getGenreList(): Promise<Genre[]> {
        return this.http.get(this.itemsUrl + '/info/genre')
            .toPromise()
            .then(response => this.factories(response.json().data))
            .catch(this.handleError);
    }

    getSerieList(): Promise<Serie[]> {
        return this.http.get(this.itemsUrl + '/info/serie')
            .toPromise()
            .then(response => this.factories(response.json().data))
            .catch(this.handleError);
    }

    getAuteurList(): Promise<Auteur[]> {
        return this.http.get('api/auteur')
            .toPromise()
            .then(response => this.factories(response.json().data))
            .catch(this.handleError);
    }

    protected getItemsByFilter(id: any, filter: string): Promise<T[]> {
        let url = `${this.itemsUrl}/${filter}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => this.factories(response.json()))
            .catch(this.handleError);
    }

    protected handleError(error: any): Promise<any> {
        //console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
    
    filter(item: any): any {

        let json: any = JSON.parse(JSON.stringify(item));

        delete json.genre;
        delete json.serie;
        
        delete json.volume_possedes;
        delete json.listVolumeMax;
        delete json.volumes;
        
        json.serie_id = null;
        json.auteurs_id = [];
        json.auteurs_new = [];
        delete json.auteurs;   
            
        if(item.genre !== undefined) { 
            if(item.genre.id === undefined) {
                json.genre_new = item.genre.nom;
            } else {
                json.genre_id = item.genre.id;
            }
        }
        
        if (item.serie !== null && item.serie !== undefined) {
            if(item.serie.id === undefined) {
                json.serie_new = item.serie;
            } else {
                json.serie_id = item.serie.id;
            }
            
        }
        
        for(let i = 0; i < item.auteurs.length; i++) {
            if(item.auteurs[i].id === undefined) {
                json.auteurs_new.push(item.auteurs[i].nom);
            } else {
                json.auteurs_id.push(item.auteurs[i].id);
            }
        }  
        
        if(item.volumes !== undefined) {
            json.volume_possedes = item.volumes;
        } 
        
        if(json.auteurs_new.length == 0) {
            delete json.auteurs_new;
        }
        
        return json;
    }

    factory(values: any = {}): T {

        let item: T = <T>new Commons(values);

        //console.log(roman);
        //console.log(values);

        /*if (values.serie_id !== undefined) {
            roman.serie = new Serie({ id: values.serie_id, nom: values.serie });
        }
  
        if (values.genre_id !== undefined) {
            roman.genre = new Genre({ id: values.genre_id, nom: values.genre });
        }*/

        return item;
    }

    factories(valuesArray: any[]): T[] {

        let items: T[] = [];

        for (let values in valuesArray) {
            items.push(this.factory(valuesArray[values]));
        }

        return items;
    }

}
