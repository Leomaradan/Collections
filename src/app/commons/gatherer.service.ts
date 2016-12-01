import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams} from '@angular/http';

export abstract class GathererService<T> {
    
    abstract urlSearch: string;
    abstract urlGather: string;
    
    abstract searchTerm: string;
    abstract gatherResourceTerm: string|null;
    
    abstract timestamp: string|null;
    
    paramsSearch: {[key:string]:string} = {};
    paramsGather: {[key:string]:string} = {};
    
    api_name: string = null;
    api_key: string = null;
    
    protected http: Http;
            
    search(term: string): Observable<any[]> {
          if (term === '') {
            return Observable.of([]);
          }


          let params = new URLSearchParams();
          params.set(this.searchTerm, term);
          
          for (let index in this.paramsSearch) {
              params.set(index, this.paramsSearch[index]);
          }
          
          if (this.timestamp !== null) {
              params.set(this.timestamp, Date.now().toString());
          }
          
          if (this.api_name !== null) {
            params.set(this.api_name, this.api_key);
          }              

          return this.http.get(this.urlSearch, {search: params})
              .map(response => this.parseSearch(response.json()));
              //.map(response => <string[]> response.json());
    }
    
    gatherData(current: T, url: string): Promise<T> {
          
          let params = new URLSearchParams();
          
          for (let index in this.paramsGather) {
              params.set(index, this.paramsGather[index]);
          }          
          
          if (this.gatherResourceTerm !== null) {
            params.set(this.gatherResourceTerm, url);
          }
          
          if (this.api_name !== null) {
            params.set(this.api_name, this.api_key);
          }          
          
          return this.http.get(this.urlGather, { search: params }).toPromise().then(item => { return this.parseGatheredData(current, item.json())});   
          
    }
    
    abstract parseGatheredData(current: T, data: any): T;
    
    parseSearch(data: any): any[] {
        return data;
    } 
        
    abstract parseSearchItem(item: {title: string}): string;
}
