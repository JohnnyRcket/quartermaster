import {Component, Input, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {Carrier} from './carrier';
import {Item} from './item';
import {Container} from './container';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ContainerComponent} from './container.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ItemModalComponent} from '../modals/item-modal.component';
import {CarrierType} from './carrierType';
import {CarrierModalComponent} from '../modals/carrier-modal.component';
import {v4 as uuidv4} from 'uuid';
import {TooltipDirective} from 'ngx-bootstrap/tooltip';
import {TooltipComponent} from '../tooltips/tooltip.component';
import {JsonService} from '../services/json.service';


@Component({
  selector: 'app-carrier',
  templateUrl: './carrier.component.html',
  styleUrls: ['../bootstrap/css/bootstrap.min.css', '../css/Footer-Basic-icons.css', '../css/bs-theme-overrides.css'],
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag,
    ContainerComponent,
    NgClass,
    TooltipDirective,
    TooltipComponent,
    NgIf
  ]
})
export class CarrierComponent {
  @Input() carrier!: Carrier;
  @ViewChildren(TooltipDirective) tooltips!: QueryList<TooltipDirective>;
  containers?: Container[];
  private previousItems: Item[] = [];
  hoveredItem: any = null;

  constructor(private modalService: NgbModal, private json: JsonService) {}

  ngOnInit() {
    this.containers = [...this.carrier.containers(this.carrier.items)];
  }

  ngAfterViewInit() {
  }

  ngDoCheck() {
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
    const isMagicBox = event.previousContainer.id === 'magic-toolbox';

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else if (isMagicBox) {
      const originalItem = event.previousContainer.data[event.previousIndex];
      const clonedItem = originalItem.clone();
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
    this.containers = [...this.carrier.containers(this.carrier.items)];
    this.json.saveToCookies();
  }

  carrierModal(carrier: Carrier){
    if (carrier.type !== CarrierType.Animal && carrier.type !== CarrierType.Character) {
      throw new Error(`Unsupported carrier type: ${carrier.type}`);
    }

    const modalRef = this.modalService.open(CarrierModalComponent);
    modalRef.componentInstance.carrierType = carrier.type;
    modalRef.componentInstance.existingCarrier = carrier;
  }

  openItemModal(parent: Carrier | Container, existingItem: Item | null = null) {
    const modalRef = this.modalService.open(ItemModalComponent);
    modalRef.componentInstance.parent = parent;
    modalRef.componentInstance.existingItem = existingItem;
  }

  openContainerModal(parent: Carrier | Container) {
    const modalRef = this.modalService.open(ItemModalComponent, );
    modalRef.componentInstance.parent = parent;
    modalRef.componentInstance.isContainer = true;
  }
  onDragEnded() {
    //this.tooltips.forEach(t => t.hide());
    this.hoveredItem = null;
  }

}
