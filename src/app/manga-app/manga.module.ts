import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CommonsModule } from '../commons';

import { MangaAppComponent } from './manga-app.component';
import { MangaDetailsComponent } from './manga-details.component';
import { MangaFormComponent } from './manga-form.component';
//import { ErrorComponent } from '../commons';

import { MangaAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    MangaAppRouting,
    FormsModule,
    CommonsModule
  ],
  exports: [
    MangaAppComponent,
    MangaDetailsComponent,
    MangaFormComponent,
    MangaAppRouting
  ],
  declarations: [
    MangaAppComponent,
    MangaDetailsComponent,
    MangaFormComponent
  ]
})
export class MangaModule { }
