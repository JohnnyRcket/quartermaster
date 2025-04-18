import { Component } from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-animal-modal',
  standalone: true,
  template: `
         <div class="modal-content">
          <div class="modal-header">
            <h4 class="modal-title">Animal</h4>
            <button class="btn-close" type="button" aria-label="Close" (click)="close()"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <span>Name: </span>
                <input class="form-control-sm mb-0 pb-1" type="text" id="animalName">
              </div>
              <div class="col">
                <span>Capacity: </span>
                <input class="form-control-sm" type="number" id="animalCapacity">
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button">Save</button>
            <button class="btn btn-secondary" type="button">Delete</button>
            <button class="btn btn-secondary" type="button" (click)="close()">Close</button>
          </div>
        </div>
  `,
  imports: []
})
export class AnimalModalComponent {

  constructor(public activeModal: NgbActiveModal) {}
  close(){
    this.activeModal.close();
  }
}
