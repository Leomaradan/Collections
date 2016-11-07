import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { RomanAppComponent }   from './roman-app.component';
import { RomanDetailsComponent }   from './roman-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'roman',
            component: RomanAppComponent,
        },
        {
          path: 'roman/:id',
          component: RomanDetailsComponent,
        },  
        {
          path: 'roman/genre/:genre',
          component: RomanAppComponent,
        },  
        {
          path: 'roman/serie/:serie',
          component: RomanAppComponent,
        },  
        {
          path: 'roman/auteur/:auteur',
          component: RomanAppComponent,
        }          
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class RomanAppRouting {}
