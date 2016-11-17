import { Genre, Auteur } from '.';

export class Commons {
    id: number;
    titre: string;
    genre: Genre;
    auteurs: Auteur[];
    couverture: string;

    static featuresList: string[];
    static featuresDetails: string[];
    static featuresForm: string[];
    
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }	

    get auteurs_display() {
        return this.auteurs.join(',');
    }
    
    getCouverture() {
        if(this.couverture) {
            return this.couverture;
        } else {
            return 'assets/unknown_cover.png';
        }
    }    
}