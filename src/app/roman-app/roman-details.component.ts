import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Roman } from './roman';
import { RomanService } from './roman.service';


@Component({
  selector: 'roman-details',
  templateUrl: './roman-details.component.html',
  styleUrls: ['./roman-details.component.css'],
  providers: [RomanService]
})
export class RomanDetailsComponent implements OnInit {

  newRoman: Roman = new Roman();
  roman: Roman;

  constructor(private romanService: RomanService, private route: ActivatedRoute) { }

  addRoman() {
      this.romanService.addRoman(this.newRoman);
      this.newRoman = new Roman();
  }
  
  removeRoman(roman: Roman) {
    this.romanService.deleteRoman(roman);
  }
      
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.romanService.getRomanById(id)
        .then(data => this.roman = data);
    });
  }

}
