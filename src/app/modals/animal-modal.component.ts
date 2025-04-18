import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Carrier} from '../entities/carrier';
import {CarrierType} from '../entities/carrierType';
import { v4 as uuidv4 } from 'uuid';
import {FormsModule} from '@angular/forms';
import {ANIMALS} from '../main-page.component';

@Component({
  selector: 'app-animal-modal',
  standalone: true,
  template: `
      <div class="modal-content">
          <div class="modal-header">
              <h4 class="modal-title">{{title}}</h4>
              <button class="btn-close" type="button" aria-label="Close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
              <div class="row">
                  <div class="col">
                      <span>Name: </span>
                      <input class="form-control-sm mb-0 pb-1" type="text" id="animalName"
                             [(ngModel)]="bufferCarrier.name">
                  </div>
                  <div class="col">
                      <span>Capacity: </span>
                      <input class="form-control-sm" type="number" id="animalCapacity"
                             [(ngModel)]="bufferCarrier.capacity">
                  </div>
              </div>
          </div>
          <div class="modal-footer">
              <button class="btn btn-secondary" type="button" (click)="save()">Save</button>
              <button class="btn btn-secondary" type="button" (click)="delete()">Delete</button>
              <button class="btn btn-secondary" type="button" (click)="closeModal()">Close</button>
          </div>
      </div>
  `,
  imports: [
    FormsModule
  ]
})
export class AnimalModalComponent {
  @Input() existingCarrier: Carrier | null = null;
  bufferCarrier = new Carrier(uuidv4(), "", 0, [], CarrierType.Animal)
  title: string = "New Animal";

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.existingCarrier){
      console.log(this.existingCarrier)
      Object.assign(this.bufferCarrier, this.existingCarrier);
      this.title = "Edit Animal"
    }
  }
  closeModal(){
    this.activeModal.close();
  }

  save(){
    if (this.existingCarrier) {Object.assign(this.existingCarrier, this.bufferCarrier);}
    else {ANIMALS.push(this.bufferCarrier)}
    console.log(ANIMALS)
    this.closeModal();
  }

  delete() {
    if (this.existingCarrier) {
      const index = ANIMALS.indexOf(this.existingCarrier);
      if (index !== -1) {
        ANIMALS.splice(index, 1);
      }
    }
    this.closeModal();
  }
}
