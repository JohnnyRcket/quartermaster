import {Component, EventEmitter, Input, Output, SimpleChanges, ViewChild} from '@angular/core';
import { Carrier } from './carrier';
import { Item } from './item';
import { Container } from './container';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {NgClass, NgForOf} from '@angular/common';
import {ContainerComponent} from './container.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemModalComponent} from '../modals/item-modal.component';
import {AnimalModalComponent} from '../modals/animal-modal.component';

@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag,
    ContainerComponent,
    NgClass
  ]
})
export class CarrierComponent {
  @Input() carrier!: Carrier;
  containers?: Container[];
  private previousItems: Item[] = [];


  constructor(private modalService: NgbModal) {}

ngOnInit() {
  this.containers = [...this.carrier.containers(this.carrier.items)];
}

  ngDoCheck() {
    // Compare current containers with previous containers
    if (this.containers && JSON.stringify(this.carrier.items) !== JSON.stringify(this.previousItems)) {
      this.previousItems = [...this.containers];
      this.containers = this.carrier.containers(this.carrier.items);
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['carrier']) {
      this.containers = this.carrier.containers(this.carrier.items);
    }
  }
  //onDrop($event: CdkDragDrop<Item[], any>) {}
  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.containers = [...this.carrier.containers(this.carrier.items)];
    }
  }

  animalModal(carrier: Carrier){
    const modalRef = this.modalService.open(AnimalModalComponent);
    modalRef.componentInstance.editCarrier = carrier;
  }

  openModal(carrier: Carrier, item?: Item) {
    const modalRef = this.modalService.open(ItemModalComponent);
    modalRef.componentInstance.carrier = carrier;
    if (item) {
      modalRef.componentInstance.item = item;
    }
  }

  protected readonly Container = Container;
}
