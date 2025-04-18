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
import {CarrierType} from './carrierType';
import {CarrierModalComponent} from '../modals/carrier-modal.component';

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

  carrierModal(carrier: Carrier){
    if (carrier.type !== CarrierType.Animal && carrier.type !== CarrierType.Character) {
      throw new Error(`Unsupported carrier type: ${carrier.type}`);
    }

    const modalRef = this.modalService.open(CarrierModalComponent);
    modalRef.componentInstance.carrierType = carrier.type;
    modalRef.componentInstance.existingCarrier = carrier;
  }

  openItemModal(carrier: Carrier, item?: Item) {
    if (item) {

    }
    else {
      const modalRef = this.modalService.open(ItemModalComponent);
    }
  }

  protected readonly Container = Container;
}
