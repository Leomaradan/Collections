import { Type } from './type';

export class Serie {
    id: number;
    nom: string;
    utilisation: number;
    type: Type;
    volume_max: number;

    static features: string[] = ['type','volume_max'];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}
