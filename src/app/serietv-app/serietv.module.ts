import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { SerieTVAppComponent } from './serietv-app.component';
import { SerieTVDetailsComponent } from './serietv-details.component';
import { SerieTVFormComponent } from './serietv-form.component';

import { SerieTVAppRouting } from './routing';

@NgModule({
  imports: [
    CommonModule,
    SerieTVAppRouting,
    Ng2CompleterModule,
    FormsModule,
    NgbModule
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
