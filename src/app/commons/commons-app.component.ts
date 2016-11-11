import { Commons, CommonsService } from '.';

export abstract class CommonsAppComponent<T extends Commons> {

  items: T[];
  filterBy: string;
  
  abstract features: string[];
  
  abstract appTitre: string;
  abstract appUrl: string  

  protected commonsService: CommonsService<T>;
      


}

