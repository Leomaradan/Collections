import { Serie, Genre, Auteur, Commons, CommonsService } from '.';
import { Router } from '@angular/router';

export abstract class CommonsFormComponent<T extends Commons> {

    item: T;

    auteurNew: string = "";
    auteurSelect: Auteur;

    genreDisplay: string;
    
    abstract features: string[] = [];
    
    abstract appTitre: string;  
    abstract appUrl: string;

    listAuteur: Auteur[];
    listGenre: Genre[];
    listSerie: Serie[];
    
    formErrors: string[];

    genreSwitcherNew: boolean = false;
    serieSwitcher: string;

    protected commonsService: CommonsService<T>;
    protected router: Router;
    
    saveItem() {
        
        this.addGenre(this.genreDisplay);
        
        if (this.features.indexOf('serie') !== -1) {
            this.addSerie((<any>this).serieDisplay);
        }
        
        if (this.features.indexOf('volume_possedes') !== -1) {
            //this.addSerie((<any>this).serieDisplay);
            (<any>this.item).volumes.splice((<any>this.item).volume_max, (<any>this.item).volumes.length - (<any>this.item).volume_max);
        }
                
        if(this.item.id) {
            this.commonsService.updateItem(this.item)
                .then((item) => this.initItem(item.id))
                .catch(error => { this.formErrors = JSON.parse(error._body)});
        } else {
            this.commonsService.addItem(this.item)
                .then((item) => {
                    this.router.navigate(['/'+this.appUrl, item.id]);
                })
                .catch(error => { this.formErrors = [error._body]});
        }
    }


    addGenre(genreNom: string) {

        let genre = this.listGenre.filter(h => h.nom === genreNom);

        if (genre.length == 0) {
            genre = [new Genre({ nom: genreNom })];
        }

        this.item.genre = genre[0];
    }

    addSerie(serieNom?: string) {

        if (serieNom == undefined || serieNom == '') {
            (<any>this.item).serie = null;
            return;
        }

        let serie = this.listSerie.filter(h => h.nom === serieNom);

        if (serie.length == 0) {
            serie = [new Serie({ nom: serieNom, volume_max: (<any>this).serieVolumeMax })];
        }

        (<any>this.item).serie = serie[0];
    }

    addAuteur(nom: string) {

        let auteurs = this.item.auteurs.filter(h => h.nom === nom);

        if (auteurs.length !== 0) {
            return
        } else {
            auteurs = this.listAuteur.filter(h => h.nom === nom);
        }

        if (auteurs.length === 0) {
            this.item.auteurs.push(new Auteur({ nom: nom }));
        } else {
            this.item.auteurs.push(auteurs[0]);
        }

    }

    addAuteurList() {
        console.log(this.auteurSelect);
        this.addAuteur(this.auteurSelect.nom);
    }
    addAuteurNew() {
        this.addAuteur(this.auteurNew);
        this.auteurNew = "";
    }

    removeAuteur(id?: number, nom?: string) {
        if (id !== undefined) {
            this.item.auteurs = this.item.auteurs.filter(h => h.id !== id);
        } else if (nom !== undefined) {
            this.item.auteurs = this.item.auteurs.filter(h => h.nom !== nom);
        }

    }

    switchSerie(id: string, checked: boolean) {
        if (checked) {
            this.serieSwitcher = id;
            if (id == 'null') {
                (<any>this).serieDisplay = '';
            }
        }
    }

    initLists() {
        this.commonsService.getGenreList().then(data => this.listGenre = data);
        this.commonsService.getSerieList().then(data => this.listSerie = data);
        this.commonsService.getAuteurList().then(data => {
            this.listAuteur = data
            this.auteurSelect = data[0];
        });  
    }

    initItem(id: number) {
        console.log(`init item with id ${id}`);
        this.commonsService.getItemById(id).then(data => {
            if(data.id == undefined) {
                this.item = <T>new Commons();
                return;
            }
            this.item = data;
            
            if(this.features.indexOf('serie') !== -1) {
            
                if ((<any>this.item).serie == null) {
                    (<any>this).serieSwitcher = "null";
                    (<any>this).serieDisplay = "";
                } else {
                    (<any>this).serieSwitcher = "list";
                    (<any>this).serieDisplay = (<any>this.item).serie.nom;
                    (<any>this).serieVolumeMax = (<any>this.item).serie.volume_max;
                }
            }

            //this.genreSelect = this.roman.genre.id;

            this.genreDisplay = this.item.genre.nom;
        });
        
        this.initLists();

    }


}
