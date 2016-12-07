export class ItemType {
    id: number;
    //nom: string;
    description: string;
    
    static features: string[] = ['description'];

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}