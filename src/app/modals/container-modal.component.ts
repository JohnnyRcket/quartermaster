import {Component, Input} from '@angular/core';
import {Item} from '../entities/item';
import {FormsModule} from '@angular/forms';
import {Carrier} from '../entities/carrier';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Container} from '../entities/container';

@Component({
  selector: 'app-container-modal',
  standalone: true,
  templateUrl: `./container-modal.component.html`,
  styleUrl: '../bootstrap/css/bootstrap.min.css',
  imports: [
    FormsModule
  ]
})
export class ContainerModalComponent {
  @Input() entity!: Carrier;
  isEdit: boolean = false;
  currentItem: Container = new Container('', '', 0, '', 0, []);

  //constructor(public activeModal: NgbActiveModal) {}

  saveItem() {
    if (this.isEdit) {
      const index = this.entity!.items.findIndex(i => i.id === this.currentItem.id);
      this.entity!.items.splice(index, 1, this.currentItem);
    } else {
      this.entity!.items.push(this.currentItem);
    }
    this.clearForm();
  }

  deleteItem() {
    if (this.isEdit && this.entity) {
      this.entity.items = this.entity.items.filter(item => item.id !== this.currentItem.id);
      this.clearForm();
    }
  }

  clearForm() {
    this.currentItem = new Container('', '', 0, '', 0, []);
    this.isEdit = false;
  }
}
