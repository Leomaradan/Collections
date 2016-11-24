import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Manga } from './manga';
import { MangaService } from './manga.service';

import { CommonsDetailsComponent } from '../commons/';


@Component({
  selector: 'manga-details',
  templateUrl: '../commons/views/details.component.html',
  styleUrls: ['../commons/views/details.component.scss'],
  providers: [MangaService]
})
export class MangaDetailsComponent extends CommonsDetailsComponent<Manga> implements OnInit {

    features = Manga.featuresDetails;
    
    appUrl: string = "manga"    
    appTitre: string = "Manga";

  constructor(public commonsService: MangaService, protected route: ActivatedRoute, protected router: Router) {
        super();
    }

      
  ngOnInit() {
      this.init();
  }
  
}
