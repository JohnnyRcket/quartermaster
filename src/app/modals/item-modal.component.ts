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
  currentItem = new Item('', '', 0, '')
  @Input() item?: Item;
  @Input() carrier?: Carrier;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.item) {this.currentItem = this.item}
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
