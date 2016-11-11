import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bd } from './bd';
import { CommonsService } from '../commons';


@Injectable()
export class BdService extends CommonsService<Bd> {
    constructor(http: Http) { 
        super();
        this.http = http;
        this.setUrl('Bd');
    }
}
