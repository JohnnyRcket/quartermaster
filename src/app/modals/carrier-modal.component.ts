import {Component, ElementRef, Input, QueryList, ViewChildren} from '@angular/core';
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
  @Input() carrierType: CarrierType = CarrierType.Tool;
  @ViewChildren('formInput') inputs!: QueryList<ElementRef>;

  bufferCarrier = new Carrier(uuidv4(), '', 0, [], CarrierType.Tool);
  emptyCarrier = new Carrier(uuidv4(), '', 0, [], CarrierType.Tool);
  title: string = "Bad Title";
  delete: string = "Bad Button";

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    setTimeout(() => {
      const first = this.inputs.first;
      if (first) {
        first.nativeElement.focus();
      }
    });

    if (!([CarrierType.Animal, CarrierType.Character] as CarrierType[]).includes(this.carrierType)) {
      throw new Error(`CarrierModalComponent received unsupported carrierType: ${this.carrierType}`);
    }

    this.bufferCarrier.type = this.carrierType;

    if (this.existingCarrier) {
      Object.assign(this.bufferCarrier, this.existingCarrier);
      this.title = this.carrierType === CarrierType.Animal ? 'Edit Animal' : 'Edit Character';
      this.delete = "Delete"
    } else {
      this.title = this.carrierType === CarrierType.Animal ? 'New Animal' : 'New Character';
      this.delete = "Clear"
    }
  }

  closeModal() {
    this.activeModal.close();
  }

  saveItem() {
    const list = this.getTargetList();
    if (this.existingCarrier) {
      Object.assign(this.existingCarrier, this.bufferCarrier);
    } else {
      list.push(this.bufferCarrier);
    }
    this.closeModal();
  }

  deleteItem() {
    if (this.existingCarrier) {
      const list = this.getTargetList();
      const index = list.indexOf(this.existingCarrier);
      if (index !== -1) {
        list.splice(index, 1);
        this.closeModal();
      }
    }
    this.clearForm()
  }

  clearForm(){Object.assign(this.bufferCarrier, this.emptyCarrier);}

  private getTargetList() {
    if (this.carrierType === CarrierType.Animal) return ANIMALS;
    if (this.carrierType === CarrierType.Character) return CHARACTERS;
    throw new Error('Invalid carrierType for saving/deleting');
  }

  onEnter(event: Event, isLast: boolean = false) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    const inputsArray = this.inputs.toArray();
    const currentIndex = inputsArray.findIndex(
      input => input.nativeElement === keyboardEvent.target
    );

    if (isLast || currentIndex === inputsArray.length - 1) {
      this.saveItem();
      return;
    }

    const next = inputsArray[currentIndex + 1];
    if (next) {
      next.nativeElement.focus();
    }
  }
}
