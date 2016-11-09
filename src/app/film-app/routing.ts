import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { FilmAppComponent }   from './film-app.component';
import { FilmDetailsComponent }   from './film-details.component';
import { FilmFormComponent } from './film-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'film',
            component: FilmAppComponent,
        },
        {
          path: 'film/:id',
          component: FilmDetailsComponent,
        },  
        {
          path: 'film/:id/edit',
          component: FilmFormComponent,
        },          
        {
          path: 'film/genre/:genre',
          component: FilmAppComponent,
        },  
        {
          path: 'film/serie/:serie',
          component: FilmAppComponent,
        },  
        {
          path: 'film/auteur/:auteur',
          component: FilmAppComponent,
        },  
        {
          path: 'film/format/:format',
          component: FilmAppComponent,
        }                   
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class FilmAppRouting {}
