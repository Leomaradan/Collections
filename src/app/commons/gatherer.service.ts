import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams} from '@angular/http';

export abstract class GathererService<T> {
    
    abstract urlSearch: string;
    abstract urlGather: string;
    
    abstract searchTerm: string;
    abstract gatherResourceTerm: string;
    
    abstract timestamp: string|null;
    
    abstract params: {[key:string]:string};
    
    protected http: Http;
            
    search(term: string): Observable<any[]> {
          if (term === '') {
            return Observable.of([]);
          }


          let params = new URLSearchParams();
          params.set(this.searchTerm, term);
          
          for (let index in this.params) {
              params.set(index, this.params[index]);
          }
          
          if (this.timestamp !== null) {
              params.set(this.timestamp, Date.now().toString());
          }

          return this.http.get(this.urlSearch, {search: params})
              .map(response => this.parseSearch(response.json()));
              //.map(response => <string[]> response.json());
    }
    
    gatherData(current: T, url: string): Promise<T> {
          
          let params = new URLSearchParams();
          
          params.set(this.gatherResourceTerm, url);
          
          return this.http.get(this.urlGather, { search: params }).toPromise().then(item => { return this.parseGatheredData(current, item.json())});   
          
    }
    
    abstract parseGatheredData(current: T, data: any): T;
    
    parseSearch(data: any): string[] {
        return data;
    } 
        
    abstract parseSearchItem(item: {title: string}): string;
}
