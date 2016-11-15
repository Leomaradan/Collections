import { Commons, CommonsService } from '.';
import { ActivatedRoute, Params, Router } from '@angular/router';


export abstract class CommonsDetailsComponent<T extends Commons> {

  item: T;
  
  abstract features: string[];
  
  abstract appTitre: string;  
  abstract appUrl: string    

  protected commonsService: CommonsService<T>;  
  protected router: Router
  protected route: ActivatedRoute;
 
  deleteItem(): void {
      this.commonsService.deleteItem(this.item).then(() => this.router.navigate(['/film']));
  }  
  
  cloneItem(field?: string, value?: any): void {
      if(field) {
        let data = {};
        if(value) {
            data[field] = value;
        } else {
            data[field] = this.item[field];
        }
        this.router.navigate([`/${this.appUrl}/new/create`, data]);
      } else {
        this.router.navigate([`/${this.appUrl}/new/create`, {clone: this.item.id}]);
      }
  }
  
  init(): void {
      

    //if(item !== null) {

    //} else {
        this.route.params.forEach((params: Params) => {
          let id = +params['id'];
          
          //console.log(cache);
          
          
          this.commonsService.getItemById(id)
            .then(data => this.item = data);
        });     
    //} 
      
    /*      let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };*/
  }

}
