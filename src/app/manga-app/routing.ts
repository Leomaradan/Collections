import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { MangaAppComponent }   from './manga-app.component';
import { MangaDetailsComponent }   from './manga-details.component';
import { MangaFormComponent } from './manga-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'manga',
            component: MangaAppComponent,
        },
        {
          path: 'manga/new/create',
          component: MangaFormComponent,
        },         
        {
          path: 'manga/:id',
          component: MangaDetailsComponent,
        },  
        {
          path: 'manga/:id/edit',
          component: MangaFormComponent,
        },          
        {
          path: 'manga/genre/:genre',
          component: MangaAppComponent,
        },   
        {
          path: 'manga/auteur/:auteur',
          component: MangaAppComponent,
        }          
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class MangaAppRouting {}
