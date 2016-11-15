import { Commons, CommonsService } from '.';
import { Router,  } from '@angular/router';

export abstract class CommonsAppComponent<T extends Commons> {

  items: T[];
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

}

