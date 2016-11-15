import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { Bd } from './bd';
import { BdService } from './bd.service';

import { CommonsDetailsComponent } from '../commons/';


@Component({
  selector: 'bd-details',
  templateUrl: '../commons/views/details.component.html',
  styleUrls: ['../commons/views/details.component.css', '../commons/views/shared.css'],
  providers: [BdService]
})
export class BdDetailsComponent extends CommonsDetailsComponent<Bd> implements OnInit {

    features = Bd.featuresDetails;
    
    appUrl: string = "bd"    
    appTitre: string = "Bd";

  constructor(protected commonsService: BdService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

      
  ngOnInit() {
      this.init();
  }
  
}
