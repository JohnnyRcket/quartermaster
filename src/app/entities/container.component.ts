import {Component, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Item} from './item';
import { Container } from './container';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ItemModalComponent} from '../modals/item-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Carrier} from './carrier';
import { v4 as uuidv4 } from 'uuid';
import {TooltipComponent} from '../tooltips/tooltip.component';
import {TooltipDirective} from 'ngx-bootstrap/tooltip';
import {ErrorToastComponent} from '../modals/error-toast.component';
import { ChangeDetectorRef } from '@angular/core';
import {JsonService} from '../services/json.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['../bootstrap/css/bootstrap.min.css', '../css/Footer-Basic-icons.css', '../css/bs-theme-overrides.css'],
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag,
    NgClass,
    TooltipComponent,
    TooltipDirective,
    ErrorToastComponent,
    NgIf
  ]
})
export class ContainerComponent {
  @Input() container!: Container;
  @Input() parent!: Carrier;
  @ViewChild(ErrorToastComponent) errorToast!: ErrorToastComponent;
  @ViewChildren(TooltipDirective) tooltips!: QueryList<TooltipDirective>;
  hoveredItem: any = null;
  constructor(private modalService: NgbModal, private json: JsonService) {}

  ngOnInit(){

  }

  onDrop(event: CdkDragDrop<any[]>) {
    const isMagicBox = event.previousContainer.id === 'magic-toolbox';
    const dragged = event.previousContainer.data[event.previousIndex];
    this.hoveredItem = null;
    if ('capacity' in dragged) {
      this.errorToast.show('Cannot drop a Container into another Container');
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (isMagicBox) {
      const originalItem = event.previousContainer.data[event.previousIndex];
      const clonedItem = Object.assign(new Item('', 0, ''), originalItem);
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
    this.json.saveToCookies();
  }

  openItemModal(parent: Carrier | Container, existingItem: Item | null = null) {
    const modalRef = this.modalService.open(ItemModalComponent);
    modalRef.componentInstance.parent = parent;
    modalRef.componentInstance.existingItem = existingItem;
  }

  onDragEnded() {
    this.hoveredItem = null;
    const hoveredElement = document.querySelector('tr:hover');
    if (hoveredElement) {
      hoveredElement.dispatchEvent(new Event('mouseleave'));
    }
  }
}
