import { NgModule }     from '@angular/core';
import { RouterModule } from '@angular/router';

import { ListsComponent }   from './lists.component';

@NgModule({
  imports: [
    RouterModule.forChild([
        {
            path: 'lists/:type',
            component: ListsComponent,
        }        
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ListsAppRouting {}

