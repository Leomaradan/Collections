import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Roman } from './roman';
import { CommonsService } from '../commons';


@Injectable()
export class RomanService extends CommonsService<Roman> {
    constructor(http: Http) { 
        super();
        this.http = http;
        this.setUrl(new Roman().constructor.name);
    }
}
