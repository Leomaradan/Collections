export class Genre {
    id: number;
    nom: string;   
    constructor(values: Object = {}) {
        Object.assign(this, values);
    }         
}
