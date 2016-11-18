import { Commons, CommonsService } from '.';
import { Router,  } from '@angular/router';

export abstract class CommonsAppComponent<T extends Commons> {

  items: {data: T[], pagination: any} = {data: [], pagination: {}};
  filterBy: string;
  
  loading: number = 0;
  
  abstract features: string[];
  
  abstract appTitre: string;
  abstract appUrl: string  

  protected commonsService: CommonsService<T>;
  protected router: Router;
  
  protected cloneObject: {};
  
  cloneItem(): void {
        this.router.navigate([`/${this.appUrl}/new/create`, this.cloneObject]);
  }  
  
  /*getPagination(pagination: any) {
      console.log(pagination);
  }*/
  
  /*getPagesArray(): number[] {
      return Array.apply(null, {length: this.items.pagination.nb_pages - 1}).map(Number.call, Number);
  }*/
  
  pageChange(event: any) {
      
      //console.log(event);
      //console.log(this.items.pagination.page);
      if (this.items.pagination.currentPage !== undefined && event !== this.items.pagination.currentPage) {
        this.loading++;
        this.commonsService.recallUrl(event).then(items => { this.items = items; this.loading--});
      }
  }

}

