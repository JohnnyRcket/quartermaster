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
            <h4 class="modal-title">Animal</h4>
            <button class="btn-close" type="button" aria-label="Close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col">
                <span>Name: </span>
                <input class="form-control-sm mb-0 pb-1" type="text" id="animalName" [(ngModel)]="carrier.name">
              </div>
              <div class="col">
                <span>Capacity: </span>
                <input class="form-control-sm" type="number" id="animalCapacity" [(ngModel)]="carrier.capacity">
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
  @Input() editCarrier?: Carrier;
  carrier = new Carrier(uuidv4(), "", 0, [], CarrierType.Animal)

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.editCarrier){this.carrier = this.editCarrier}
  }
  closeModal(){
    this.activeModal.close();
  }

  save(){
    if (!this.editCarrier) {ANIMALS.push(this.carrier)}
    console.log(ANIMALS)
    this.closeModal();
  }

  delete() {
    if (this.editCarrier) {
      const index = ANIMALS.indexOf(this.editCarrier);
      if (index !== -1) {
        ANIMALS.splice(index, 1);
      }
    }
    this.closeModal();
  }
}
