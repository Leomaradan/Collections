import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { BdAppComponent }   from './bd-app.component';
import { BdDetailsComponent }   from './bd-details.component';
import { BdFormComponent } from './bd-form.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'bd',
            component: BdAppComponent,
        },
        {
          path: 'bd/new/create',
          component: BdFormComponent,
        },         
        {
          path: 'bd/:id',
          component: BdDetailsComponent,
        },  
        {
          path: 'bd/:id/edit',
          component: BdFormComponent,
        },          
        {
          path: 'bd/genre/:genre',
          component: BdAppComponent,
        },  
        {
          path: 'bd/serie/:serie',
          component: BdAppComponent,
        },  
        {
          path: 'bd/auteur/:auteur',
          component: BdAppComponent,
        }          
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class BdAppRouting {}
