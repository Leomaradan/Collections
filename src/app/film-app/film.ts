import { Serie, Genre, Auteur, Commons } from '../commons';

export class Film extends Commons {
	id: number;
	titre: string;
	serie?: Serie;
	genre: Genre;
	volume?: number;
	auteurs: Auteur[];
        format: string[];
        
        static featuresList = ["serie", "format"];
        static featuresDetails = ["serie", "format"];
        static featuresForm = ["serie", "format"];
        
        listFormat = [
            { value: 'dvd', display: 'DVD' },
            { value: 'blu-ray', display: 'Blu-Ray' },
            { value: 'blu-ray 3d', display: 'Blu-Ray 3D' },
            { value: 'blu-ray 4k', display: 'Blu-Ray 4K' }
        ];        
}
