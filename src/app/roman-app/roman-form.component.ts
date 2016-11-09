import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Roman } from './roman';
import { RomanService } from './roman.service';

import { CommonsFormComponent } from '../commons/commons-form.component';

@Component({
    selector: 'roman-form',
    templateUrl: '../commons/form.component.html',
    styleUrls: ['../commons/form.component.css'],
    providers: [RomanService]
})
export class RomanFormComponent extends CommonsFormComponent<Roman> implements OnInit {

    //roman: Roman;
    serieDisplay: string;
    serieVolumeMax: number = 1;    
    
    constructor(protected commonsService: RomanService, protected route: ActivatedRoute) {
        super();
        this.features = ["serie", "volume"];
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            if (id) {
                this.initItem(id);
            } else {
                this.item = <any>new Roman();
                this.serieSwitcher = "null";
            }

        });
    }

}
