import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Roman } from './roman';
import { RomanService } from './roman.service';

import { CommonsDetailsComponent } from '../commons/';


@Component({
  selector: 'roman-details',
  templateUrl: '../commons/views/details.component.html',
  styleUrls: ['../commons/views/details.component.css'],
  providers: [RomanService]
})
export class RomanDetailsComponent extends CommonsDetailsComponent<Roman> implements OnInit {

    features = Roman.featuresDetails;
    
    appUrl: string = "roman"    
    appTitre: string = "Romans";

  constructor(protected commonsService: RomanService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

      
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.commonsService.getItemById(id)
        .then(data => this.item = data);
    });
  }
  
}
