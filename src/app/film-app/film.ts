import { Serie, Genre, Auteur, Commons } from '../commons';

export class Film extends Commons {
	id: number;
	titre: string;
	serie?: Serie;
	genre: Genre;
	volume?: number;
	auteurs: Auteur[];
        format: string[];
        vue: boolean = false;
        
        static featuresList = ['serie', 'format', 'volume', 'vue'];
        static featuresDetails = ['serie', 'format', 'volume', 'vue'];
        static featuresForm = ['serie', 'format', 'volume', 'vue', 'gatherer'];
        
        static listFormat = [
            { value: 'dvd', display: 'DVD', icon: 'DVD_logo' },
            { value: 'blu-ray', display: 'Blu-Ray', icon: 'Blu-Ray_logo' },
            { value: 'blu-ray 3d', display: 'Blu-Ray 3D', icon: '3D-Blu-Ray_logo' },
            { value: 'blu-ray 4k', display: 'Blu-Ray 4K', icon: 'UHD-Blu-Ray_logo' }
        ];        
}
