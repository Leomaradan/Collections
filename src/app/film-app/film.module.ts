import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonsModule } from '../commons';

import { FilmAppComponent } from './film-app.component';
import { FilmDetailsComponent } from './film-details.component';
import { FilmFormComponent } from './film-form.component';

import { FilmAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    FilmAppRouting,
    FormsModule,
    CommonsModule
  ],
  exports: [
    FilmAppComponent,
    FilmDetailsComponent,
    FilmFormComponent,
    FilmAppRouting
  ],
  declarations: [
    FilmAppComponent,
    FilmDetailsComponent,
    FilmFormComponent
  ]
})
export class FilmModule { }
