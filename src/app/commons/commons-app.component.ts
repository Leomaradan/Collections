import { Commons, CommonsService, CommonsResponse, Errors } from '.';
import { ActivatedRoute, Params, Router } from '@angular/router';
//import { NullablePipe } from '../nullable.pipe';

export abstract class CommonsAppComponent<T extends Commons> {

  items: {data: T[], pagination: any} = {data: [], pagination: {}};
  filterBy: string;
  addFilter: boolean = false;
  
  loading: number = 0;
  
  abstract features: string[];
  abstract filters: CommonsFilter[] | null;
  
  abstract appTitre: string;
  abstract appUrl: string  

  public commonsService: CommonsService<T>;
  protected router: Router;
  protected route: ActivatedRoute
  
  public orderField = "titre";
  public orderDirection = "ASC";     
  
  protected cloneObject: {};
  
  errors: Errors = new Errors();
    
  cloneItem(): void {
        this.router.navigate([`/${this.appUrl}/new/create`, this.cloneObject]);
  }  
  
  searchChanged(search: string) {
    this.commonsService.searchItems(search).then(items => { 
        this.items = items; 
        this.loading--;
        this.orderField = this.commonsService.orderField;
        this.orderDirection = this.commonsService.orderDirection;
    })
    .catch(error => { 
        this.errors.setErrors(error._body); 
        this.loading--;
    });        

  }
    
  changeOrder(order: string) {
    if (order == this.commonsService.orderField) {
        this.commonsService.orderDirection = (this.commonsService.orderDirection == "DESC") ? 'ASC' : 'DESC';
    } else {
        this.commonsService.orderField = order;
        this.commonsService.orderDirection = 'ASC';
    }

    let orderString = this.commonsService.orderField;
    if(this.commonsService.orderDirection !== 'ASC') {
        orderString += ' DESC';
    }

    let page: number = 0;
    if(this.items.pagination.currentPage !== undefined) {
          page = this.items.pagination.currentPage;
    }

    this.commonsService.recallUrl(page, orderString).then(items => { 
        this.items = items; 
        this.loading--;
        this.orderField = this.commonsService.orderField;
        this.orderDirection = this.commonsService.orderDirection;
    })
    .catch(error => { 
        this.errors.setErrors(error._body); 
        this.loading--;
    });  
  }
    
  /*getPagination(pagination: any) {
      console.log(pagination);
  }*/
  
  /*getPagesArray(): number[] {
      return Array.apply(null, {length: this.items.pagination.nb_pages - 1}).map(Number.call, Number);
  }*/
  
  init(features: string[], filters?: CommonsFilter[]) {
    this.route.params.forEach((params: Params) => {
        let genre = +params['genre'];
        let serie = params['serie'];
        let auteur = +params['auteur'];
        let format = params['format'];
        let filter = params['filter'];
        let recherche = params['recherche'];
        let page = (+params['page']) ? +params['page'] : 1;

        this.loading++;
        
        let currentFilter: CommonsFilter;

        let promise: Promise<CommonsResponse<T>>;

        this.features = features.slice();
        
        if(filters) {
            currentFilter = filters.find(f => f.url == filter);
        }
        this.addFilter = false;
        if(currentFilter) {
            promise = this.commonsService.getItemsByFilter(null, currentFilter.url);
            this.filterBy = currentFilter.name;
        } else if(genre) {
            promise = this.commonsService.getItemsByGenre(genre, page);
            this.filterBy = "genre";
            this.addFilter = true;
            this.cloneObject = {genre: genre};
        } else if (serie) {
            promise = this.commonsService.getItemsBySerie(serie, page);
            this.filterBy = "série";
            this.addFilter = true;
            this.features.push('volume');
            this.cloneObject = {serie: serie};
        } else if (auteur) {
            promise = this.commonsService.getItemsByAuteur(auteur, page);
            this.filterBy = "auteur";
            this.addFilter = true;
            this.cloneObject = {auteur: auteur};
        } else if (format) {
            promise = (<any>this.commonsService).getItemsByFormat(format, page);
            this.filterBy = "format";
            this.addFilter = true;
            this.cloneObject = {format: format};
         } else if (recherche) {
            promise = this.commonsService.searchItems(recherche, page);
            this.filterBy = null;
         } else {
            promise = this.commonsService.getAllItems(page);
            this.filterBy = null;
        }
      
        promise.then(items => {
            this.items = items;
            this.loading--;
            this.orderField = this.commonsService.orderField;
            this.orderDirection = this.commonsService.orderDirection;        
        })
        .catch(error => { 
            this.errors.setErrors(error._body); 
            this.loading--;
        });  
      
    });      
  }
  
  pageChange(event: any) {
      
      
      if (this.items.pagination.currentPage !== undefined && event !== this.items.pagination.currentPage) {
        let orderString = this.commonsService.orderField;
        if(this.commonsService.orderDirection !== 'ASC') {
            orderString += ' DESC';
        }  
                
        this.loading++;
        this.commonsService.recallUrl(event, orderString).then(items => { 
            this.items = items; 
            this.loading--;
            this.orderField = this.commonsService.orderField;
            this.orderDirection = this.commonsService.orderDirection;
        }).catch(error => { 
            this.errors.setErrors(error._body); 
            this.loading--;
        }); 
      }
  }

}

export interface CommonsFilter {
    url: string;
    name: string;
}

