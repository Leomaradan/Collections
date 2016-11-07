import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Roman } from './roman';
import { Serie } from '../serie';
import { Genre } from '../genre';


@Injectable()
export class RomanService {

  private romansUrl = 'api/roman'; 
  private headers = new Headers({'Content-Type': 'application/json'});

  //lastId: number = 0;

  //romans: Roman[] = [];

  constructor(private http: Http) { }  

  // POST /roman
  addRoman(roman: Roman): RomanService {
    this.http
      .post(this.romansUrl, JSON.stringify(roman), {headers: this.headers})
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
    return this;
  }

  // DELETE /roman/:id
  deleteRoman(roman: Roman): RomanService {
      const url = `${this.romansUrl}/${roman.id}`;
      this.http.delete(url, {headers: this.headers})
      .toPromise()
      .then(() => null)
      .catch(this.handleError);

    return this;
  }

  // PUT /roman/:id
  updateRoman(roman: Roman): Promise<Roman> {
      const url = `${this.romansUrl}/${roman.id}`;
    return this.http
      .put(url, JSON.stringify(roman), {headers: this.headers})
      .toPromise()
      .then(() => roman)
      .catch(this.handleError);
  }

  // GET /roman
  getAllRomans() : Promise<Roman[]> {
        return this.http.get(this.romansUrl)
               .toPromise()
            .then(response => this.factories(response.json()))
               .catch(this.handleError);      
  }

  // GET /roman/:id
  getRomanById(id: number) : Promise<Roman> {
      const url = `${this.romansUrl}/${id}`;
        return this.http.get(url)
               .toPromise()
               .then(response => this.factory(response.json()[0]))
               .catch(this.handleError);   
  }
  
  // GET /roman/genre/:genre
  getRomansByGenre(genre: number) : Promise<Roman[]> {
    return this.getRomansByFilter(genre, 'genre'); 
  }  
  
  // GET /roman/serie/:serie
  getRomansBySerie(serie: number) : Promise<Roman[]> {
    return this.getRomansByFilter(serie, 'serie');
  }    
  
  // GET /roman/serie/:serie
  getRomansByAuteur(auteur: number) : Promise<Roman[]> {
    return this.getRomansByFilter(auteur, 'auteur');
  }    
  
  private getRomansByFilter(id: number, filter: string) : Promise<Roman[]> {
    const url = `${this.romansUrl}/${filter}/${id}`;
      return this.http.get(url)
             .toPromise()
             .then(response => this.factories(response.json()))
             .catch(this.handleError);   
  }
  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
  
          
  factory(values: any = {}): Roman {

      let roman: Roman = new Roman(values);

      //console.log(roman);
      //console.log(values);

      /*if (values.serie_id !== undefined) {
          roman.serie = new Serie({ id: values.serie_id, nom: values.serie });
      }

      if (values.genre_id !== undefined) {
          roman.genre = new Genre({ id: values.genre_id, nom: values.genre });
      }*/

      return roman;
  }

  factories(valuesArray: any[]): Roman[] {

      let romans: Roman[] = [];

      for (let values in valuesArray) {
          romans.push(this.factory(valuesArray[values]));
      }

      console.log(romans);

      return romans;
  }  

}
