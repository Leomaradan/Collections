import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListsComponent } from './lists.component';
import { ListsAppRouting } from './lists.routing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ListsAppRouting,
    NgbModule,
    FormsModule
  ],
  exports: [
    ListsAppRouting  
  ],
  declarations: [
      ListsComponent
  ]
})
export class ListsModule { }
