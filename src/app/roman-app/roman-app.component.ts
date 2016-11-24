import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Roman } from './roman';
import { RomanService } from './roman.service';

import { CommonsAppComponent } from '../commons/';

@Component({
  selector: 'roman-app',
  templateUrl: '../commons/views/app.component.html',
  styleUrls: ['../commons/views/app.component.scss'],
  providers: [RomanService]
})
export class RomanAppComponent extends CommonsAppComponent<Roman> implements OnInit {


    appTitre: string = "Romans";

    appUrl: string = "roman"

    features = Roman.featuresList;  

  constructor(public commonsService: RomanService, protected route: ActivatedRoute, protected router: Router) {
    super();
  }
    
  ngOnInit() {

      this.init(Roman.featuresList);

    /*this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let serie = +params['serie'];
      let auteur = +params['auteur'];
      let page = (+params['page']) ? +params['page'] : 1;
      
      this.loading++;
      
      this.features = Roman.featuresList.slice();
      
      if(genre) {
          this.commonsService.getItemsByGenre(genre, page).then(romans => {this.items = romans; this.loading--});
          this.filterBy = "genre";
          this.cloneObject = {genre: genre};
      } else if (serie) {
          this.commonsService.getItemsBySerie(serie, page).then(romans => {this.items = romans; this.loading--});
          this.filterBy = "série";
          this.features.push('volume');
          this.cloneObject = {serie: serie};
      } else if (auteur) {
          this.commonsService.getItemsByAuteur(auteur, page).then(romans => {this.items = romans; this.loading--});
          this.filterBy = "auteur";
          this.cloneObject = {auteur: auteur};
      } else {
        this.commonsService.getAllItems(page).then(romans => {this.items = romans; this.loading--});
        this.filterBy = null;
      }
    });*/

      
      
  }

}
