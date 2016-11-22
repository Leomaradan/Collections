import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonsModule } from '../commons';

import { SerieTVAppComponent } from './serietv-app.component';
import { SerieTVDetailsComponent } from './serietv-details.component';
import { SerieTVFormComponent } from './serietv-form.component';

import { SerieTVAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    SerieTVAppRouting,
    FormsModule,
    CommonsModule
  ],
  exports: [
    SerieTVAppComponent,
    SerieTVDetailsComponent,
    SerieTVFormComponent,
    SerieTVAppRouting
  ],
  declarations: [
    SerieTVAppComponent,
    SerieTVDetailsComponent,
    SerieTVFormComponent
  ]
})
export class SerieTVModule { }
