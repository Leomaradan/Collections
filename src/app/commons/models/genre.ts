import { ItemType } from './type';

export class Genre {
    id: number;
    nom: string;
    utilisation: number; 
    type: ItemType; 
    
    static features: string[] = ['type'];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }         
}
