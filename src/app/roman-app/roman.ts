import { Serie, Genre, Auteur, Commons } from '../commons';

export class Roman extends Commons {
	id: number;
	titre: string;
	serie?: Serie;
	genre: Genre;
	volume?: number;
	auteurs: Auteur[];
        
        static featuresList = ["serie", "volume"];
        static featuresDetails = ["serie", "volume"];
        static featuresForm = ["serie", "volume"];        

}
