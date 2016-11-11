import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Manga } from './manga';
import { MangaService } from './manga.service';

import { CommonsAppComponent } from '../commons/';

@Component({
  selector: 'manga-app',
  templateUrl: '../commons/views/app.component.html',
  styleUrls: ['../commons/views/app.component.css'],
  providers: [MangaService]
})
export class MangaAppComponent extends CommonsAppComponent<Manga> implements OnInit {


    appTitre: string = "Manga";

    appUrl: string = "manga"

    features = Manga.featuresList;  

  constructor(protected commonsService: MangaService, protected route: ActivatedRoute) {
    super();
  }
    
  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let auteur = +params['auteur'];
      
      if(genre) {
          this.commonsService.getItemsByGenre(genre).then(mangas => this.items = mangas);
          this.filterBy = "genre";
      } else if (auteur) {
          this.commonsService.getItemsByAuteur(auteur).then(mangas => this.items = mangas);
          this.filterBy = "auteur";
      } else {
        this.commonsService.getAllItems().then(mangas => this.items = mangas);
        this.filterBy = null;
      }
    });

      
      
  }

}
