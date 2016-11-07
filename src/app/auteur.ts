
export class Auteur {
    id: number;
    nom: string;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
