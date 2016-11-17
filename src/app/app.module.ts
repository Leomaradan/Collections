import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { RomanModule } from './roman-app';
import { FilmModule } from './film-app';
import { BdModule } from './bd-app';
import { MangaModule } from './manga-app';
//import { RomanAppComponent } from './roman-app/roman-app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    /*{
        path: '',
        redirectTo: '/roman',
        pathMatch: 'full'
    }*/
    {
      path: '',
      redirectTo: 'roman',
      pathMatch: 'full'
    },    
];

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RomanModule,
    FilmModule,
    BdModule,
    MangaModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
