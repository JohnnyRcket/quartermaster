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
import * as bootstrap from 'bootstrap';
import {Modal} from 'bootstrap';
import {EmitPackage} from './emitPackage';

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
  @Output() modalEmit = new EventEmitter<EmitPackage>();
  containers?: Container[];
  private previousItems: Item[] = [];
  emitModal!: EmitPackage;

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

  openModal(event: MouseEvent, carrier: Carrier, item?: Item) {
    const target = event.target as HTMLElement;
    const modalElement = document.querySelector('#itemModal') as HTMLElement;
    const modal = new bootstrap.Modal(modalElement);
    if (item) {this.emitModal = new EmitPackage(carrier, modal, item)}
    else {this.emitModal = new EmitPackage(carrier, modal)}
    this.modalEmit.emit(this.emitModal)
  }

  protected readonly Container = Container;
}
