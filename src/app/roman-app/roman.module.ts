import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { RouterModule } from '@angular/router';

import { RomanAppComponent } from './roman-app.component';
import { RomanDetailsComponent } from './roman-details.component';

import { RomanAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    RomanAppRouting
  ],
  exports: [
    RomanAppComponent,
    RomanDetailsComponent,
    RomanAppRouting
  ],
  declarations: [
    RomanAppComponent,
    RomanDetailsComponent
  ]
})
export class RomanModule { }
