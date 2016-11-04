export class Roman {
	id: number;
	titre: string;
	serie_id: number|null;
	genre_id: number;
	volume: number|null;
	volume_max: number|null;
	auteurs_id: number[];

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}	
}
