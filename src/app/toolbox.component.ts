import {Component} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Item} from './entities/item';
import {Carrier} from './entities/carrier';
import {ItemModalComponent} from './modals/item-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CarrierType} from './entities/carrierType';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {Container} from './entities/container';
import {EXAMPLE_TOOLBOX} from './example.data';
import {v4 as uuidv4} from 'uuid';
import {TooltipComponent} from './tooltips/tooltip.component';
import {TooltipDirective} from 'ngx-bootstrap/tooltip';
import {JsonService} from './services/json.service';

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
    TooltipDirective,
    NgIf
  ],
    standalone: true
})
export class ToolboxComponent {
  hoveredItem: any = null;
  shakeGold = false;
  shakeExp = false;

  get toolbox(): Carrier {
    return this.json.activeInventory.toolbox ?? new Carrier('Toolbox', 0, [], CarrierType.Tool);
  }
  get gold(): number {
    return this.json.activeInventory.gold ?? 0;
  }

  set gold(value: number) {
    if (this.json.activeInventory.toolbox) {
      this.json.activeInventory.gold = value;
      this.json.saveToCookies();
    }
  }

  get exp(): number {
    return this.json.activeInventory.exp ?? 0;
  }

  set exp(value: number) {
    if (this.json.activeInventory.toolbox) {
      this.json.activeInventory.exp = value;
      this.json.saveToCookies();
    }
  }

  constructor(private modalService: NgbModal, public json: JsonService) {}

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
  }
  onDragStarted() {
    this.hoveredItem = null;
    const hoveredElement = document.querySelector('tr:hover');
    if (hoveredElement) {
      hoveredElement.dispatchEvent(new Event('mouseleave'));
    }
  }

  onKeyDown(event: KeyboardEvent, field: 'gold' | 'exp'): void {
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
    if (allowedKeys.includes(event.key)) return;

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
      if (field === 'gold') this.shakeGold = true;
      if (field === 'exp') this.shakeExp = true;
    }
  }

  onAnimationEnd(field: 'gold' | 'exp'): void {
    if (field === 'gold') this.shakeGold = false;
    if (field === 'exp') this.shakeExp = false;
  }

  onEnter(event: Event): void {
    event.preventDefault();
  }
}
