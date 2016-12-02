import { Type } from './type';

export class Genre {
    id: number;
    nom: string;
    utilisation: number; 
    type: Type; 
    
    static features: string[] = ['type'];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }         
}
