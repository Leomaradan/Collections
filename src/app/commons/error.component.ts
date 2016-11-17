import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'commons-error',
    //templateUrl: '../commons/views/details.component.html',
    //styleUrls: ['../commons/views/details.component.scss'],
    template: '<div>Test</div>'
    //providers: []
})
export class ErrorComponent implements OnInit {

    @Input() errors;
    

    ngOnInit() {
        //this.init();
        console.log(this.errors);
    }    
}

