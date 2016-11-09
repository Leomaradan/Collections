import { Serie, Genre, Auteur, Commons } from '../commons';

export class Film extends Commons {
	id: number;
	titre: string;
	serie?: Serie;
	genre: Genre;
	volume?: number;
	auteurs: Auteur[];
        format: string[];
}
