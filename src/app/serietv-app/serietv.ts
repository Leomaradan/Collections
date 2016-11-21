import { Genre, Auteur, Commons } from '../commons';

export class SerieTV extends Commons {
	id: number;
	titre: string;
	genre: Genre;
	auteurs: Auteur[];
        
        volume_max: number;
        volume_possedes: string;
        
        volumes: number[];
        
        listVolumeMax: number[];
        format: string[];
                
        static featuresList: string[] = ['volume_possedes','volume_max', 'format'];
        static featuresDetails: string[] = ['volume_possedes','volume_max', 'format'];
        static featuresForm: string[] = ['volume_possedes','volume_max', 'format'];    
        
        static listFormat = [
            { value: 'dvd', display: 'DVD', icon: 'DVD_logo' },
            { value: 'blu-ray', display: 'Blu-Ray', icon: 'Blu-Ray_logo' },
            { value: 'blu-ray 3d', display: 'Blu-Ray 3D', icon: '3D-Blu-Ray_logo' },
            { value: 'blu-ray 4k', display: 'Blu-Ray 4K', icon: 'UHD-Blu-Ray_logo' }
        ];               
        
        static addVolumesLists(seriestv: SerieTV[]) : SerieTV[] {
            seriestv.forEach(function(serietv) {
                serietv = SerieTV.addVolumesList(serietv);
            });

            return seriestv;
        }

        static addVolumesList(serietv: SerieTV): SerieTV {
            let volumes_list: number[] = [];
            if(serietv.volume_possedes != '') {

                let volumes = serietv.volume_possedes.split(',');

                for(let volumeGroup of volumes) {
                    let test = +volumeGroup;
                    if(Number.isInteger(test)) {
                        volumes_list.push(test);
                    } else {
                        let start = +(volumeGroup.split('-')[0]);
                        let end = +(volumeGroup.split('-')[1]);
                        for(let i = start; i <= end; i++) {
                            volumes_list.push(i);
                        }
                    }
                }
            }
            serietv.volumes = volumes_list; 
            serietv.listVolumeMax = [];

            for (let i = 1; i <= serietv.volume_max; i++) {
                serietv.listVolumeMax.push(i);
            }

            return serietv;

        }    
}
