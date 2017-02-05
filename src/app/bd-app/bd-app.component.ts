import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Bd } from './bd';
import { BdService } from './bd.service';

import { CommonsAppComponent } from '../commons/';

@Component({
  selector: 'bd-app',
  templateUrl: '../commons/views/app.component.html',
  styleUrls: ['../commons/views/app.component.scss'],
  providers: [BdService]
})
export class BdAppComponent extends CommonsAppComponent<Bd> implements OnInit {


    appTitre: string = "Bd";

    appUrl: string = "bd"

    features = Bd.featuresList;  
    
    filters = null;

  constructor(public commonsService: BdService, protected route: ActivatedRoute, protected router: Router) {
    super();
  }
    
  ngOnInit() {
      
      this.init(Bd.featuresList);
 /*
    this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let serie = +params['serie'];
      let auteur = +params['auteur'];
      let page = (+params['page']) ? +params['page'] : 1;
      
      this.loading++;
      
      this.features = Bd.featuresList.slice();
      
      if(genre) {
          this.commonsService.getItemsByGenre(genre, page).then(bds => {this.items = bds; this.loading--});
          this.filterBy = "genre";
          this.cloneObject = {genre: genre};
      } else if (serie) {
          this.commonsService.getItemsBySerie(serie, page).then(bds => {this.items = bds; this.loading--});
          this.filterBy = "série";
          this.features.push('volume');
          this.cloneObject = {serie: serie};
      } else if (auteur) {
          this.commonsService.getItemsByAuteur(auteur, page).then(bds => {this.items = bds; this.loading--});
          this.filterBy = "auteur";
          this.cloneObject = {auteur: auteur};
      } else {
          this.commonsService.getAllItems(page).then(bds => { this.items = bds; this.loading--});
        this.filterBy = null;
      }
    });
*/
      
      
  }

}
