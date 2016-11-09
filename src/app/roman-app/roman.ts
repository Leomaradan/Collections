import { Serie } from '../commons/serie';
import { Genre } from '../commons/genre';
import { Auteur } from '../commons/auteur';

import { Commons } from '../commons/commons';


export class Roman extends Commons {
	id: number;
	titre: string;
	serie?: Serie;
	genre: Genre;
	volume?: number;
	auteurs: Auteur[];
}
