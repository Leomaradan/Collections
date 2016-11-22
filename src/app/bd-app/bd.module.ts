import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonsModule } from '../commons';

import { BdAppComponent } from './bd-app.component';
import { BdDetailsComponent } from './bd-details.component';
import { BdFormComponent } from './bd-form.component';

import { BdAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    BdAppRouting,
    FormsModule,
    CommonsModule
  ],
  exports: [
    BdAppComponent,
    BdDetailsComponent,
    BdFormComponent,
    BdAppRouting
  ],
  declarations: [
    BdAppComponent,
    BdDetailsComponent,
    BdFormComponent
  ]
})
export class BdModule { }
