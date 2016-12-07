import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2CompleterModule } from "ng2-completer";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InputDebounceComponent } from '../inputdebounce.component';
import { NullablePipe } from '../nullable.pipe';
import { GathererModalComponent } from './gatherer.component';


@NgModule({
  imports: [
    CommonModule,
    Ng2CompleterModule,    
    FormsModule,
    NgbModule
  ],
  exports: [
    InputDebounceComponent,
    Ng2CompleterModule,    
    NgbModule,
    GathererModalComponent,
    NullablePipe    
  ],
  declarations: [
    InputDebounceComponent,
    GathererModalComponent,
    NullablePipe
  ],
  entryComponents: [GathererModalComponent]
})
export class CommonsModule { }
