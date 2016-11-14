import { Commons, CommonsService } from '.';

export abstract class CommonsAppComponent<T extends Commons> {

  items: T[];
  filterBy: string;
  
  loading: number = 0;
  
  abstract features: string[];
  
  abstract appTitre: string;
  abstract appUrl: string  

  protected commonsService: CommonsService<T>;
      


}

