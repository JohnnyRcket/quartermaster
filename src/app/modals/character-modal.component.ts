import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Carrier} from '../entities/carrier';
import {v4 as uuidv4} from 'uuid';
import {CarrierType} from '../entities/carrierType';
import {ANIMALS, CHARACTERS} from '../main-page.component';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-character-modal',
  standalone: true,
  template: `
      <div class="modal-content">
          <div class="modal-header">
              <h4 class="modal-title">Character</h4>
              <button class="btn-close" type="button" aria-label="Close" (click)="closeModal()"></button>
          </div>
          <div class="modal-body">
              <div class="row">
                  <div class="col">
                      <span>Name: </span>
                      <input class="form-control-sm mb-0 pb-1" type="text" id="characterName"
                             [(ngModel)]="bufferCarrier.name">
                  </div>
                  <div class="col">
                      <span>Capacity: </span>
                      <input class="form-control-sm" type="number" id="characterCapacity"
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
export class CharacterModalComponent {
  @Input() existingCarrier?: Carrier;
  bufferCarrier = new Carrier(uuidv4(), "", 0, [], CarrierType.Animal)
  title: string = "New Character";

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.existingCarrier){
      console.log(this.existingCarrier)
      Object.assign(this.bufferCarrier, this.existingCarrier);
      this.title = "Edit Character"
    }
  }
  closeModal(){
    this.activeModal.close();
  }

  save(){
    if (this.existingCarrier) {Object.assign(this.existingCarrier, this.bufferCarrier);}
    else {CHARACTERS.push(this.bufferCarrier)}
    console.log(CHARACTERS)
    this.closeModal();
  }

  delete() {
    if (this.existingCarrier) {
      const index = CHARACTERS.indexOf(this.existingCarrier);
      if (index !== -1) {
        CHARACTERS.splice(index, 1);
      }
    }
    this.closeModal();
  }
}
