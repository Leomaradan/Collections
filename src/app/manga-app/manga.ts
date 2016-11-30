import { Genre, Auteur, Commons } from '../commons';

export class Manga extends Commons {
	id: number;
	titre: string;
	genre: Genre;
	auteurs: Auteur[];
        
        volume_max: number;
        volume_possedes: string;
        
        volumes: number[];
        
        listVolumeMax: number[]
                
        static featuresList: string[] = ['volume_possedes','volume_max'];
        static featuresDetails: string[] = ['volume_possedes','volume_max'];
        static featuresForm: string[] = ['volume_possedes','volume_max','gatherer'];        
        
    static addVolumesLists(mangas: Manga[]) : Manga[] {
        mangas.forEach(function(manga) {
            manga = Manga.addVolumesList(manga);
        });
        
        return mangas;
    }
    
    static addVolumesList(manga: Manga): Manga {
        let volumes_list: number[] = [];
        if(manga.volume_possedes != '') {
            //return manga;
            manga.volume_possedes = String(manga.volume_possedes);
            let volumes = manga.volume_possedes.split(',');
            
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
        manga.volumes = volumes_list; 
        manga.listVolumeMax = [];
        
        for (let i = 1; i <= manga.volume_max; i++) {
            manga.listVolumeMax.push(i);
        }

        return manga;
     
    }    
    
 
        
        /*get volumes() {
            return this.volume_possedes;
        }  */  
}
