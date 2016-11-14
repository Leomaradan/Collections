import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";

import { RomanAppComponent } from './roman-app.component';
import { RomanDetailsComponent } from './roman-details.component';
import { RomanFormComponent } from './roman-form.component';

import { RomanAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    RomanAppRouting,
    Ng2CompleterModule,    
    FormsModule
  ],
  exports: [
    RomanAppComponent,
    RomanDetailsComponent,
    RomanFormComponent,
    RomanAppRouting
  ],
  declarations: [
    RomanAppComponent,
    RomanDetailsComponent,
    RomanFormComponent
  ]
})
export class RomanModule { }
