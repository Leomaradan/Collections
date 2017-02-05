import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Manga } from './manga';
import { MangaService } from './manga.service';

import { CommonsAppComponent, CommonsFilter } from '../commons/';

@Component({
  selector: 'manga-app',
  templateUrl: '../commons/views/app.component.html',
  styleUrls: ['../commons/views/app.component.scss'],
  providers: [MangaService]
})
export class MangaAppComponent extends CommonsAppComponent<Manga> implements OnInit {


    appTitre: string = "Manga";

    appUrl: string = "manga"

    features = Manga.featuresList;  
    
    filters: CommonsFilter[] = [{url: 'shopping', name: 'Liste d\'achat'}];

  constructor(public commonsService: MangaService, protected route: ActivatedRoute, protected router: Router) {
    super();
  }
    
  ngOnInit() {

    this.init(Manga.featuresList, this.filters);

    /*this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let auteur = +params['auteur'];
      let page = (+params['page']) ? +params['page'] : 1;
      
      this.loading++;
            
      if(genre) {
          this.commonsService.getItemsByGenre(genre, page).then(mangas => {this.items = mangas; this.loading--});
          this.filterBy = "genre";
          this.cloneObject = {genre: genre};
      } else if (auteur) {
          this.commonsService.getItemsByAuteur(auteur, page).then(mangas => {this.items = mangas; this.loading--});
          this.filterBy = "auteur";
          this.cloneObject = {auteur: auteur};
      } else {
        this.commonsService.getAllItems(page).then(mangas => {this.items = mangas; this.loading--});
        this.filterBy = null;
      }
    });*/

      
      
  }

}
