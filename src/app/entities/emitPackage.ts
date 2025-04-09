import {Item} from './item';
import {Carrier} from './carrier';
import {Modal} from 'bootstrap';

export class EmitPackage {
  item?: Item;
  carrier: Carrier;
  emitModal: Modal;

  constructor(carrier: Carrier, emitModal: Modal, item?: Item) {
    this.carrier = carrier;
    this.emitModal = emitModal;
    if (item) {
      this.item = item;
    }
  }
}
