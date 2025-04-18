import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Carrier } from '../entities/carrier';
import { CarrierType } from '../entities/carrierType';
import { v4 as uuidv4 } from 'uuid';
import { FormsModule } from '@angular/forms';
import { ANIMALS, CHARACTERS } from '../main-page.component';

@Component({
  selector: 'app-carrier-modal',
  standalone: true,
  templateUrl: `./carrier-modal.component.html`,
  imports: [FormsModule]
})
export class CarrierModalComponent {
  @Input() existingCarrier: Carrier | null = null;

  // Default to an INVALID type to catch misuses early
  @Input() carrierType: CarrierType = CarrierType.Tool;

  bufferCarrier = new Carrier(uuidv4(), '', 0, [], CarrierType.Tool);
  title: string = 'New Carrier';

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (!([CarrierType.Animal, CarrierType.Character] as CarrierType[]).includes(this.carrierType)) {
      throw new Error(`CarrierModalComponent received unsupported carrierType: ${this.carrierType}`);
    }

    this.bufferCarrier.type = this.carrierType;

    if (this.existingCarrier) {
      Object.assign(this.bufferCarrier, this.existingCarrier);
      this.title = this.carrierType === CarrierType.Animal ? 'Edit Animal' : 'Edit Character';
    } else {
      this.title = this.carrierType === CarrierType.Animal ? 'New Animal' : 'New Character';
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  save() {
    const list = this.getTargetList();
    if (this.existingCarrier) {
      Object.assign(this.existingCarrier, this.bufferCarrier);
    } else {
      list.push(this.bufferCarrier);
    }
    this.closeModal();
  }

  delete() {
    if (this.existingCarrier) {
      const list = this.getTargetList();
      const index = list.indexOf(this.existingCarrier);
      if (index !== -1) {
        list.splice(index, 1);
      }
    }
    this.closeModal();
  }

  private getTargetList() {
    if (this.carrierType === CarrierType.Animal) return ANIMALS;
    if (this.carrierType === CarrierType.Character) return CHARACTERS;
    throw new Error('Invalid carrierType for saving/deleting');
  }
}
