export class Serie {
    id: number;
    nom: string;
    volume_max: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
