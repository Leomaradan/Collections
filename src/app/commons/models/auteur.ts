import { Type } from './type';

export class Auteur {
    id: number;
    nom: string;
    utilisation: number;    
    static features: string[] = [];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
