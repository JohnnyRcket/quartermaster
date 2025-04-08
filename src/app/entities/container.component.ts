import { Component, Input } from '@angular/core';
import {Item} from './item';
import { Container } from './container';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag,
    NgClass,
  ]
})
export class ContainerComponent {
  @Input() container!: Container;

  ngOnInit(){

  }
  //onDrop($event: CdkDragDrop<Item[], any>) {}

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.container.element.nativeElement.classList.contains("container")  && event.item.element.nativeElement.classList.contains("container")) {

      //Todo: change this to a modal

      alert('Cannot drop a Container into another Container');
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      console.log('Item moved from', event.previousContainer, 'to', event.container);
    }
  }


}
