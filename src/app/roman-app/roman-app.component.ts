import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Roman } from './roman';
import { RomanService } from './roman.service';

@Component({
  selector: 'roman-app',
  templateUrl: './roman-app.component.html',
  styleUrls: ['../commons/app.component.css'],
  providers: [RomanService]
})
export class RomanAppComponent implements OnInit {

  romans: Roman[];
  filterBy: string;

  constructor(private commonsService: RomanService, private route: ActivatedRoute) { }
    
  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let serie = +params['serie'];
      let auteur = +params['auteur'];
      
      if(genre) {
          this.commonsService.getItemsByGenre(genre).then(romans => this.romans = romans);
          this.filterBy = "genre";
      } else if (serie) {
          this.commonsService.getItemsBySerie(serie).then(romans => this.romans = romans);
          this.filterBy = "série";
      } else if (auteur) {
          this.commonsService.getItemsByAuteur(auteur).then(romans => this.romans = romans);
          this.filterBy = "auteur";
      } else {
        this.commonsService.getAllItems().then(romans => this.romans = romans);
        this.filterBy = null;
      }
    });

      
      
  }

}
