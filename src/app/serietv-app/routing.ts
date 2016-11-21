import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { SerieTVAppComponent }   from './serietv-app.component';
import { SerieTVDetailsComponent }   from './serietv-details.component';
import { SerieTVFormComponent } from './serietv-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'serietv',
            component: SerieTVAppComponent,
        },
        {
          path: 'serietv/new/create',
          component: SerieTVFormComponent,
        },         
        {
          path: 'serietv/:id',
          component: SerieTVDetailsComponent,
        },  
        {
          path: 'serietv/:id/edit',
          component: SerieTVFormComponent,
        },          
        {
          path: 'serietv/genre/:genre',
          component: SerieTVAppComponent,
        },   
        {
          path: 'serietv/auteur/:auteur',
          component: SerieTVAppComponent,
        }          
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class SerieTVAppRouting {}
