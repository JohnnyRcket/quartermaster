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
  get gold(): string {
    const num = parseInt((this.json.activeInventory.gold + '').replace(/,/g, ''), 10);
    return isNaN(num) ? '0' : num.toLocaleString();
  }

  get exp(): string {
    const num = parseInt((this.json.activeInventory.exp + '').replace(/,/g, ''), 10);
    return isNaN(num) ? '0' : num.toLocaleString();
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
      const clonedItem = originalItem.clone();
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

  selectInput(event: FocusEvent): void {
    const input = event.target as HTMLInputElement;
    input.select();
  }
  updateGoldOrExp(field: 'gold' | 'exp', input: string): void {
    const digitsOnly = input.replace(/[^0-9]/g, '');
    const number = parseInt(digitsOnly, 10);

    this.json.activeInventory[field] = isNaN(number) ? '0' : number.toLocaleString();
    this.json.saveToCookies();
  }

  onDragEnded() {
    //this.tooltips.forEach(t => t.hide());
    this.hoveredItem = null;
  }

}
