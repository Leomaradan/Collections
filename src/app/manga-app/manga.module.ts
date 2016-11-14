import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";

import { MangaAppComponent } from './manga-app.component';
import { MangaDetailsComponent } from './manga-details.component';
import { MangaFormComponent } from './manga-form.component';

import { MangaAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    MangaAppRouting,
    Ng2CompleterModule,
    FormsModule
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
