import {Component, Input, input} from '@angular/core';
import {Item} from '../entities/item';
import {FormsModule} from '@angular/forms';
import {Carrier} from '../entities/carrier';
import {NgbActiveModal, NgbModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-item-modal',
  standalone: true,
  templateUrl: `./item-modal.component.html`,
  styleUrl: '../bootstrap/css/bootstrap.min.css',
  imports: [
    FormsModule, NgbModalModule
  ]

})
export class ItemModalComponent {
  bufferItem = new Item('', '', 0, '')
  @Input() existingItem: Item|null = null;
  @Input() carrier: Carrier|null = null;
  title: string = "New Item"

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.existingItem) {
      Object.assign(this.bufferItem, this.existingItem);
      this.title = "Edit Item"
    }
  }

  ngAfterViewInit() {

  }

  saveItem() {

  }

  deleteItem() {

  }

  clearForm() {
    //this.currentItem = new Item('', '', 0, '');
  }

  close(){
    this.activeModal.close();
  }

}
