import {Component, Input} from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'gatherer-modal',
    template: `<div class="modal-header">
                    <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 class="modal-title">Valeurs de remplacement</h4>
                  </div>
                  <div class="modal-body">
                    <ul>
                        <li *ngFor="let bind of binding">
                            <input type="checkbox" [(ngModel)]="bind.override"><b>{{bind.label}}</b> : 
                            <img *ngIf="isImg(bind.oldValue)" [src]="bind.oldValue" style="width: 25%">
                            <span *ngIf="!isImg(bind.oldValue)">{{bind.oldValue}}</span> 
                            -> 
                            <img *ngIf="isImg(bind.newValue)" [src]="bind.newValue" style="width: 25%">
                            <span *ngIf="!isImg(bind.newValue)">{{bind.newValue}}</span> 
                        </li>
                    </ul>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
                  </div>
    `
})
export class GathererModalComponent {
    @Input() binding: any;

    constructor(public activeModal: NgbActiveModal) {}
    
    isImg(value: string) : boolean {
        return value.match(/\.(jpg|png|gif|jpeg)$/gi) !== null
    }
}
