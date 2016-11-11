import { Commons, CommonsService } from '.';
import { Router } from '@angular/router';


export abstract class CommonsDetailsComponent<T extends Commons> {

  item: T;
  
  abstract features: string[];
  
  abstract appTitre: string;  
  abstract appUrl: string    

  protected commonsService: CommonsService<T>;  
  protected router: Router
 
  deleteItem(): void {
      this.commonsService.deleteItem(this.item).then(() => this.router.navigate(['/film']));
  }  

}
