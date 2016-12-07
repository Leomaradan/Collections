import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';

//import { Roman } from './roman';
import { Commons, Serie, Genre, Auteur, CommonsResponse, ItemType } from '.';


export interface Lists {
    id: number;
    nom: string;
    utilisation: number;
}

@Injectable()
export class ListsService<T extends Lists> {

    private itemsUrl = 'api/genre';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    
    public pagination: number = 5;
    public paginationResponse: any;
    
    public requestUrl: string;

    public orderField = "nom";
    public orderDirection = "ASC";    
           
    public isOnline: boolean = true;
    
    private http: Http;
    
    constructor(http: Http) {
      window.addEventListener('online', () => {this.isOnline = true});
      window.addEventListener('offline', () => {this.isOnline = false});
      this.http = http;
    }   
     
    setUrl(urlName: string) {
        this.itemsUrl = `api/${urlName}`;
    }

    // POST /roman
    addItem(item: T): Promise<T> {
        if (!this.isOnline) {
            return new Promise<T>(function(resolve, reject) { reject('The application is offline')});
        }
        
        return this.http
            .post(this.itemsUrl, JSON.stringify(this.filter(item)), { headers: this.headers })
            .toPromise()
            .then(response => response.json().data);
    }

    // DELETE /roman/:id
    deleteItem(item: T): Promise<T> {
        if (!this.isOnline) {
            return new Promise<T>(function(resolve, reject) { reject('The application is offline')});
        }        
        let url = `${this.itemsUrl}/${item.id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null);
    }

    // PUT /roman/:id
    updateItem(item: T): Promise<T> {
        if (!this.isOnline) {
            return new Promise<T>(function(resolve, reject) { reject('The application is offline')});
        }        
        let url = `${this.itemsUrl}/${item.id}`;
        return this.http
            .put(url, JSON.stringify(this.filter(item)), { headers: this.headers })
            .toPromise()
            .then(response => response.json().data);
    }

    // GET /roman
    getAllItems(page: number = 0, order: string = null): Promise<CommonsResponse<T>> {
        let url = this.itemsUrl;

        return this.getItems(this.getUrlParams(url, page, order), page);
    }

    recallUrl(page: number, order: string): Promise<CommonsResponse<T>> {
        let url: string;
        
        if (this.requestUrl === undefined) {
            url = this.itemsUrl;
        } else {
            url = this.requestUrl;
        }   
        
        return this.getItems(this.getUrlParams(url, page, order), page);
        
             
    }
    

    protected getUrlParams(url: string, page: number, order: string): string {
        
        if (url.indexOf('?') !== -1) {
            url += '&';
        } else {
            url += '?';
        }
        let params: string[] = [];
        
        if (this.pagination !== null && page !== -1) {
            params.push('page='+page);
            params.push('pagination='+this.pagination);
        }   
        
        if (order !== null) {
            let orders = order.split(' ');
            params.push('order='+orders[0]);
            if(orders[1] !== undefined) {
                params.push('orderDirection='+orders[1]);
            }
        }  
        
        url += params.join('&');
        
        return url;
    }

    getTypeList(): Promise<ItemType[]> {
        return this.http.get('api/type')
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }
     
    protected getItems(url: string, page: number): Promise<CommonsResponse<T>> {
        
        if (!this.isOnline) {
            
                return new Promise<CommonsResponse<T>>(function(resolve, reject) {
                    reject("The application is offline");  
                });
                

        }
        
        return this.http.get(url)
            .toPromise()
            .then(response => {

                let res = <CommonsResponse<T>>response.json();
                
                if(res.pagination !== undefined) {
                    this.paginationResponse = res.pagination;
                    this.paginationResponse.currentPage = page;
                }
                
                this.requestUrl = res.request;
                
                let orders = res.order.split(' ');
                this.orderField = orders[0];
                if(orders[1] !== undefined) {
                    this.orderDirection = orders[1];
                }
                
                let responseObj: CommonsResponse<T> = { data: this.factories(res.data), pagination: this.paginationResponse, request: res.request, order: res.order};
                
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

        delete json.type;
        
        json.type_id = null;
            
        if(item.type !== null && item.type !== undefined) { 
            json.type_id = item.type.id;

        }
        
        return json;
    }

    factory(values: any = {}): T {

        let item = values;
        
        if(item.type_id !== undefined) {
            item.type = new ItemType({id: item.type_id, description: item.type_description});
        }

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
            //items.push(valuesArray[values]);
            items.push(this.factory(valuesArray[values]));
        }

        return items;
    }

}

