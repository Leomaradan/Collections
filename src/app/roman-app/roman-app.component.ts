import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Roman } from './roman';
import { RomanService } from './roman.service';

@Component({
  selector: 'roman-app',
  templateUrl: './roman-app.component.html',
  styleUrls: ['./roman-app.component.css'],
  providers: [RomanService]
})
export class RomanAppComponent implements OnInit {

  romans: Roman[];
  filterBy: string;

  constructor(private romanService: RomanService, private route: ActivatedRoute) { }
    
  ngOnInit() {

    this.route.params.forEach((params: Params) => {
      let genre = +params['genre'];
      let serie = +params['serie'];
      let auteur = +params['auteur'];
      
      if(genre) {
          this.romanService.getRomansByGenre(genre).then(romans => this.romans = romans);
          this.filterBy = "genre";
      } else if (serie) {
          this.romanService.getRomansBySerie(serie).then(romans => this.romans = romans);
          this.filterBy = "série";
      } else if (auteur) {
          this.romanService.getRomansByAuteur(auteur).then(romans => this.romans = romans);
          this.filterBy = "auteur";
      } else {
        this.romanService.getAllRomans().then(romans => this.romans = romans);
        this.filterBy = null;
      }
    });

      
      
  }

}
