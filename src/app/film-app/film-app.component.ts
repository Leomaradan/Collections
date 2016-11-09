import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Film } from './film';
import { FilmService } from './film.service';

@Component({
  selector: 'film-app',
  templateUrl: './film-app.component.html',
  styleUrls: ['../commons/app.component.css'],
  providers: [FilmService]
})
export class FilmAppComponent implements OnInit {

  films: Film[];
  filterBy: string;

  constructor(private commonsService: FilmService, private route: ActivatedRoute) { }
    
  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let serie = +params['serie'];
      let auteur = +params['auteur'];
      let format = params['format'];
      
      if(genre) {
          this.commonsService.getItemsByGenre(genre).then(films => this.films = films);
          this.filterBy = "genre";
      } else if (serie) {
          this.commonsService.getItemsBySerie(serie).then(films => this.films = films);
          this.filterBy = "série";
      } else if (auteur) {
          this.commonsService.getItemsByAuteur(auteur).then(films => this.films = films);
          this.filterBy = "auteur";
      } else if (format) {
          this.commonsService.getItemsByFormat(format).then(films => this.films = films);
          this.filterBy = "format";
      }else {
          this.commonsService.getAllItems().then(films => this.films = films);
        this.filterBy = null;
      }
    });
  
  }

}
