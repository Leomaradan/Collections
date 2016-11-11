import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Bd } from './bd';
import { BdService } from './bd.service';

import { CommonsAppComponent } from '../commons/';

@Component({
  selector: 'bd-app',
  templateUrl: '../commons/views/app.component.html',
  styleUrls: ['../commons/views/app.component.css'],
  providers: [BdService]
})
export class BdAppComponent extends CommonsAppComponent<Bd> implements OnInit {


    appTitre: string = "Bd";

    appUrl: string = "bd"

    features = Bd.featuresList;  

  constructor(protected commonsService: BdService, protected route: ActivatedRoute) {
    super();
  }
    
  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let serie = +params['serie'];
      let auteur = +params['auteur'];
      
      if(genre) {
          this.commonsService.getItemsByGenre(genre).then(bds => this.items = bds);
          this.filterBy = "genre";
      } else if (serie) {
          this.commonsService.getItemsBySerie(serie).then(bds => this.items = bds);
          this.filterBy = "série";
      } else if (auteur) {
          this.commonsService.getItemsByAuteur(auteur).then(bds => this.items = bds);
          this.filterBy = "auteur";
      } else {
        this.commonsService.getAllItems().then(bds => this.items = bds);
        this.filterBy = null;
      }
    });

      
      
  }

}
