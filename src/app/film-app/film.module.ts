import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FilmAppComponent } from './film-app.component';
import { FilmDetailsComponent } from './film-details.component';
import { FilmFormComponent } from './film-form.component';

import { FilmAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    FilmAppRouting,
    Ng2CompleterModule,
    FormsModule,
    NgbModule
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
