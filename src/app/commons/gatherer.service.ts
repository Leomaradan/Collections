import {Observable} from 'rxjs/Observable';
import {Http, URLSearchParams} from '@angular/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { GathererModalComponent } from './gatherer.component';

export interface GathererBind {
    override: boolean;
    display: boolean;
    field: string; 
    //field: {current: string, gather: string}|string; 
    label: string;
    oldValue: string; 
    newValue: string;        
}

export interface GathererModalObject<T> {
    data:T; 
    bind:GathererBind[];
}

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
    
    closeResult: string;

    protected modalService: NgbModal;
            
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
        let clone: T = JSON.parse(JSON.stringify(current));

        for (let index in this.paramsGather) {
            params.set(index, this.paramsGather[index]);
        }

        if (this.gatherResourceTerm !== null) {
            params.set(this.gatherResourceTerm, url);
        }

        if (this.api_name !== null) {
            params.set(this.api_name, this.api_key);
        }



        return this.http.get(this.urlGather, { search: params }).toPromise().then(item => {
            let data = this.parseGatheredData(clone, item.json());

            let modal = this.modalService.open(GathererModalComponent);
                
            modal.componentInstance.binding = data.bind.filter(b => b.display);
           
            modal.result.then((result) => {
              this.closeResult = `Closed with: ${result}`;
              for (let item of data.bind) {
                  if(item.override) {
                      //if (typeof item.field === "string") {
                        current[item.field] = data.data[item.field];
                      /*} else {
                          current[item.field.current] = data.data[item.field.gather];  
                      }*/
                  }
              }
            }, (reason) => {
              this.closeResult = `Dismissed ${reason}`;
            });              
            
            //return data;
        });   
          
    }
    
    abstract parseGatheredData(current: T, data: any): GathererModalObject<T>;
    
    parseSearch(data: any): any[] {
        return data;
    } 
    
    makeBind(titre: string, field: string, oldValue: any, newValue: any): GathererBind {
        let oldValueString: string = this.formatValue(oldValue);
        let newValueString: string = this.formatValue(newValue);

        // auto-override si old == new
        let display = !(oldValueString === newValueString);
        return { override: true, label: titre, field: field, oldValue: oldValueString, newValue: newValueString, display: display};        
    }
    
    private formatValue(value: any) : string {
        if (typeof value === "object") {
            if (Array.isArray(value)) {
                return value.join(', ');
            } else {
                return JSON.stringify(value);
            }
        } else if (typeof value === "boolean") {
            return (value) ? 'Oui' : 'Non';
        } else if (typeof value === "number") {
            return value.toString();
        } 
        
        return value;
    }
        
    abstract parseSearchItem(item: {title: string}): string;
}
