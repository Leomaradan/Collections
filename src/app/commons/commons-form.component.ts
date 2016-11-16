import { Serie, Genre, Auteur, Commons, CommonsService } from '.';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { CompleterService, CompleterData } from 'ng2-completer';

export abstract class CommonsFormComponent<T extends Commons> {

    item: T;

    //auteurNew: string = "";
    //auteurSelect: Auteur;
    //auteurSelect: string;

    genreDisplay: string;
    
    abstract features: string[] = [];
    
    abstract appTitre: string;  
    abstract appUrl: string;

    listAuteur: Auteur[];
    listGenre: Genre[];
    listSerie: Serie[];
    
    formErrors: string[];

    //genreSwitcherNew: boolean = false;
    //serieSwitcher: string;

    protected commonsService: CommonsService<T>;
    protected router: Router;
    protected route: ActivatedRoute;
    
    protected completerService: CompleterService;
    
    protected auteurDataService: CompleterData;
    protected genreDataService: CompleterData;
    protected serieDataService: CompleterData;
    
    loading: boolean = false;
    
    saveItem() {
        
        this.addGenre(this.genreDisplay);
        
        /*if (this.features.indexOf('serie') !== -1) {
            this.addSerie((<any>this).serieDisplay);
        }*/
        
        if (this.features.indexOf('volume_possedes') !== -1) {
            //this.addSerie((<any>this).serieDisplay);
            (<any>this.item).volumes.splice((<any>this.item).volume_max, (<any>this.item).volumes.length - (<any>this.item).volume_max);
        }
                
        this.loading = true;
        
        if(this.item.id) {
            this.commonsService.updateItem(this.item)
                .then((item) => {
                    this.loading = false;
                    this.router.navigate(['/'+this.appUrl, item.id]);
                })
                .catch(error => { this.formErrors = JSON.parse(error._body); this.loading = false;});
        } else {
            this.commonsService.addItem(this.item)
                .then((item) => {
                    this.loading = false;
                    this.router.navigate(['/'+this.appUrl, item.id]);
                })
                .catch(error => { this.formErrors = [error._body]; this.loading = false;});
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
        (<any>this.item).serieVolumeMax = serie[0].volume_max;
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
    
    addAuteurAutocomplete(value: string) {
        this.addAuteur(value)
    }

    removeAuteur(id?: number, nom?: string) {
        if (id !== undefined) {
            this.item.auteurs = this.item.auteurs.filter(h => h.id !== id);
        } else if (nom !== undefined) {
            this.item.auteurs = this.item.auteurs.filter(h => h.nom !== nom);
        }

    }

    switchSerie(value: string) {
        this.addSerie(value);
    }

    /*switchSerieOld(id: string, checked: boolean) {
        if (checked) {
            this.serieSwitcher = id;
            if (id == 'null') {
                (<any>this).serieDisplay = '';
            }
        }
    }*/

    initLists() {
        this.commonsService.getGenreList().then(data => {
            this.listGenre = data
            this.genreDataService = this.completerService.local(this.listGenre, 'nom', 'nom'); 
        });
        this.commonsService.getSerieList().then(data => {
            this.listSerie = data;
            this.serieDataService = this.completerService.local(this.listSerie, 'nom', 'nom'); 
        });
        this.commonsService.getAuteurList().then(data => {
            this.listAuteur = data
            //this.auteurSelect = data[0];
            this.auteurDataService = this.completerService.local(this.listAuteur, 'nom', 'nom');  
        });  
    }
    
    init(): void {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            let clone = +params['clone'];
            if (id) {
                this.initItem(id);
            } else {
                if(clone) {
                    this.initItem(clone);
                    this.item.id = null;
                } else {
                    this.initNewItem();
                    
                    let titre = params['titre'];
                    let serie = params['serie'];
                    let genre = params['genre'];
                    let volume = +params['volume'];
                    let auteur = +params['auteur'];
                    let format = params['format'];

                    if(titre) {
                        this.item.titre = titre;
                    }
                    
                    if(serie) {
                        if(serie == "null") {
                            (<any>this.item).serie = null;
                            (<any>this).serieDisplay = "";
                        } else {
                            this.commonsService.getSerieById(serie).then(serie => {
                                (<any>this.item).serie = serie;
                                (<any>this).serieDisplay = serie.nom;
                                (<any>this).serieVolumeMax = serie.volume_max;                                
                            });
                        }
                    }
                    
                    if(genre) {
                        this.commonsService.getGenreById(genre).then(genre => {this.item.genre = genre; this.genreDisplay = this.item.genre.nom;});
                    }  
                    
                    if(volume) {
                        (<any>this.item).volume = volume;
                    }    
                    
                    if(format) {
                        (<any>this.item).format = format;
                    }                                                            

                    if(auteur) {
                        this.commonsService.getAuteurById(auteur).then(auteur => this.item.auteurs.push(auteur));
                    }
                    
                  
                }
            }

        });        
    }
    
    abstract initNewItem(): void;

    initItem(id: number) {

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
