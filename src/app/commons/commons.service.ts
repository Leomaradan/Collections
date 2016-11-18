import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import { Roman } from './roman';
import { Commons, Serie, Genre, Auteur } from '.';

//interface Promise<{data: T[], pagination: any}>
export interface CommonsResponse<T> {
    data: T[];
    pagination: any;
    request: string;
}

export class CommonsService<T extends Commons> {

    private itemsUrl = 'api/roman';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    
    public pagination: number = 5;
    public paginationResponse: any;
    
    public requestUrl: string;

    
    private urls: {[key:string]:string} = {
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
            .then(response => this.factory(response.json().data));
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
            .then(response => this.factory(response.json().data));
            //.catch(this.handleError);
    }

    // GET /roman
    getAllItems(page: number = 0): Promise<CommonsResponse<T>> {
        let url = this.itemsUrl;
        if (this.pagination !== null) {
            url += '?page='+page+'&pagination='+this.pagination;
        }
        return this.getItems(url, page);
    }

        // GET /roman/:id
    getItemById(id: number): Promise<T> {
        let url = `${this.itemsUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => this.factory(response.json().data))
            .catch(this.handleError);
    }

    // GET /roman/genre/:genre
    getItemsByGenre(genre: number, page: number = 0): Promise<CommonsResponse<T>> {
        return this.getItemsByFilter(genre, 'genre', page);
    }

    // GET /roman/serie/:serie
    getItemsBySerie(serie: number, page: number = 0): Promise<CommonsResponse<T>> {
        return this.getItemsByFilter(serie, 'serie', page);
    }

    // GET /roman/serie/:serie
    getItemsByAuteur(auteur: number, page: number = 0): Promise<CommonsResponse<T>> {
        return this.getItemsByFilter(auteur, 'auteur', page);
    }
    
    recallUrl(page: number): Promise<CommonsResponse<T>> {
        let url: string;
        
        if (this.requestUrl === undefined) {
            url = this.itemsUrl;
        } else {
            url = this.requestUrl;
        }
        
        if (this.pagination !== null) {
            url += '?page='+page+'&pagination='+this.pagination;
        }   
        
        return this.getItems(url, page);
        
             
    }

    getGenreList(): Promise<Genre[]> {
        return this.http.get(this.itemsUrl + '/info/genre')
            .toPromise()
            .then(response => this.factories(response.json().data))
            .catch(this.handleError);
    }
    
    getGenreById(id: number): Promise<Genre> {
        let url = `api/genre/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => this.factory(response.json().data))
            .catch(this.handleError);
    }    

    getSerieList(): Promise<Serie[]> {
        return this.http.get(this.itemsUrl + '/info/serie')
            .toPromise()
            .then(response => this.factories(response.json().data))
            .catch(this.handleError);
    }
    
    getSerieById(id: number): Promise<Serie> {
        let url = `api/serie/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => this.factory(response.json().data))
            .catch(this.handleError);
    }    

    getAuteurList(): Promise<Auteur[]> {
        return this.http.get('api/auteur')
            .toPromise()
            .then(response => this.factories(response.json().data))
            .catch(this.handleError);
    }
    
    getAuteurById(id: number): Promise<Auteur> {
        let url = `api/auteur/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => this.factory(response.json().data))
            .catch(this.handleError);
    }

    protected getItemsByFilter(id: any, filter: string, page: number = 0): Promise<CommonsResponse<T>> {
        let url = `${this.itemsUrl}/${filter}/${id}`;
        if (this.pagination !== null) {
            url += '?page='+page+'&pagination='+this.pagination;
        }    
        
        return this.getItems(url, page);

    }
    
    protected getItems(url: string, page: number): Promise<CommonsResponse<T>> {
        return this.http.get(url)
            .toPromise()
            .then(response => {

                let res = <CommonsResponse<T>>response.json();
                
                if(res.pagination !== undefined) {
                    this.paginationResponse = res.pagination;
                    this.paginationResponse.currentPage = page;
                }
                
                this.requestUrl = res.request;
                
                let responseObj: CommonsResponse<T> = { data: this.factories(res.data), pagination: this.paginationResponse, request: res.request};
                return responseObj;               
             })
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
