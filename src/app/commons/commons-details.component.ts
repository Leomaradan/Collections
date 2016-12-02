import { Commons, CommonsService, Errors } from '.';
import { ActivatedRoute, Params, Router } from '@angular/router';


export abstract class CommonsDetailsComponent<T extends Commons> {

  item: T;
  
  abstract features: string[];
  
  abstract appTitre: string;  
  abstract appUrl: string    

  public commonsService: CommonsService<T>;  
  protected router: Router
  protected route: ActivatedRoute;
  
  errors: Errors = new Errors();
 
  deleteItem(): void {
      this.commonsService.deleteItem(this.item).then(() => this.router.navigate([`/${this.appUrl}`]));
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
            .then(data => this.item = data)
            .catch(error => { 
                this.errors.setErrors(error._body); 
            });
        });     
    //} 
      
    /*      let navigationExtras: NavigationExtras = {
      queryParams: { 'session_id': sessionId },
      fragment: 'anchor'
    };*/
  }

}
