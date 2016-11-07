import { Serie } from '../serie';
import { Genre } from '../genre';
import { Auteur } from '../auteur';


export class Roman {
	id: number;
	titre: string;
	serie?: Serie;
	genre: Genre;
	volume?: number;
	auteurs: Auteur[];

	constructor(values: Object = {}) {
            Object.assign(this, values);
	}	
        
        get auteurs_display() {
            return this.auteurs.join(',');
        }
      
}
