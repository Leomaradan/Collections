import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


import { Roman } from './roman';
import { RomanService } from './roman.service';


@Component({
  selector: 'roman-details',
  templateUrl: './roman-details.component.html',
  styleUrls: ['../commons/details.component.css'],
  providers: [RomanService]
})
export class RomanDetailsComponent implements OnInit {

  roman: Roman;

  constructor(private commonsService: RomanService, private route: ActivatedRoute, private router: Router) { }
      
  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.commonsService.getItemById(id)
        .then(data => this.roman = data);
    });
  }
  
  gotoForm(): void {
    this.router.navigate(['/roman/:id/edit', this.roman.id]);
  }    

}
