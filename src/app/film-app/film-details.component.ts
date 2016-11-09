import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Film } from './film';
import { FilmService } from './film.service';


@Component({
  selector: 'film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['../commons/details.component.css'],
  providers: [FilmService]
})
export class FilmDetailsComponent implements OnInit {

  film: Film;

  constructor(private commonsService: FilmService, private route: ActivatedRoute, private router: Router) { }
      
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.commonsService.getItemById(id)
        .then(data => this.film = data);
    });
  }
  
  gotoForm(): void {
    this.router.navigate(['/film/:id/edit', this.film.id]);
  }    

}
