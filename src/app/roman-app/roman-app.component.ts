import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Roman } from './roman';
import { RomanService } from './roman.service';

import { CommonsAppComponent } from '../commons/';

@Component({
  selector: 'roman-app',
  templateUrl: '../commons/views/app.component.html',
  styleUrls: ['../commons/views/app.component.css'],
  providers: [RomanService]
})
export class RomanAppComponent extends CommonsAppComponent<Roman> implements OnInit {


    appTitre: string = "Romans";

    appUrl: string = "roman"

    features = Roman.featuresList;  

  constructor(protected commonsService: RomanService, protected route: ActivatedRoute) {
    super();
  }
    
  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let serie = +params['serie'];
      let auteur = +params['auteur'];
      
      if(genre) {
          this.commonsService.getItemsByGenre(genre).then(romans => this.items = romans);
          this.filterBy = "genre";
      } else if (serie) {
          this.commonsService.getItemsBySerie(serie).then(romans => this.items = romans);
          this.filterBy = "série";
      } else if (auteur) {
          this.commonsService.getItemsByAuteur(auteur).then(romans => this.items = romans);
          this.filterBy = "auteur";
      } else {
        this.commonsService.getAllItems().then(romans => this.items = romans);
        this.filterBy = null;
      }
    });

      
      
  }

}
