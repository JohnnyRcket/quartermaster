import {Component, EventEmitter, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Item} from './entities/item';
import {Carrier} from './entities/carrier';
import {ItemModalComponent} from './modals/item-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrierType} from './entities/carrierType';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Container} from './entities/container';
import {EXAMPLE_TOOLBOX} from './example.data';
import { v4 as uuidv4 } from 'uuid';
import {TooltipComponent} from './tooltips/tooltip.component';
import {TooltipDirective} from 'ngx-bootstrap/tooltip';

@Component({
    selector: 'app-toolbox',
    templateUrl: './toolbox.component.html',
    styleUrls: ['./bootstrap/css/bootstrap.min.css', './css/Footer-Basic-icons.css', './css/bs-theme-overrides.css'],
  imports: [
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    CdkDropList,
    NgClass,
    CdkDrag,
    TooltipComponent,
    TooltipDirective
  ],
    standalone: true
})
export class ToolboxComponent {
  toolbox: Carrier = new Carrier("7001", "Toolbox", 42069, [EXAMPLE_TOOLBOX], CarrierType.Tool)
  goldAmount = 1572;
  expAmount = 350;
  hoveredItem: any = null;

  constructor(private modalService: NgbModal) {}

  ngOnInit(){
  }

  openItemModal(parent: Carrier | Container, existingItem: Item | null = null) {
    const modalRef = this.modalService.open(ItemModalComponent);
    modalRef.componentInstance.parent = parent;
    modalRef.componentInstance.existingItem = existingItem;
  }

  onDrop(event: CdkDragDrop<any[]>) {
    const isMagicBox = event.previousContainer.id === 'magic-toolbox';

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (isMagicBox) {
      const originalItem = event.previousContainer.data[event.previousIndex];
      const clonedItem = Object.assign(new Item('', '', 0, ''), originalItem);
      clonedItem.id = uuidv4();
      event.container.data.splice(event.currentIndex, 0, clonedItem);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
