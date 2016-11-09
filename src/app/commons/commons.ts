import { Genre } from './genre';
import { Auteur } from './auteur';

export class Commons {
    id: number;
    titre: string;
    genre: Genre;
    auteurs: Auteur[];
    //couverture: string;
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }	

    get auteurs_display() {
        return this.auteurs.join(',');
    }    
}