import {Component, ElementRef, HostListener, Input, QueryList, ViewChildren} from '@angular/core';
import {Item} from '../entities/item';
import {FormsModule} from '@angular/forms';
import {Carrier} from '../entities/carrier';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {Container} from '../entities/container';
import {NgForOf, NgIf} from '@angular/common';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {ErrorToastComponent} from './error-toast.component';
import {TemplateService} from '../services/template.service';
import {JsonService} from '../services/json.service';

@Component({
  selector: 'app-item-modal',
  standalone: true,
  templateUrl: `./item-modal.component.html`,
  imports: [
    FormsModule, NgbModalModule, NgIf, SelectDropDownModule, ErrorToastComponent, NgForOf
  ]

})
export class ItemModalComponent {
  bufferItem!: Item | Container;
  emptyContainer: Container = new Container('', 0, '', 0, []);
  emptyItem = new Item('', 0, '');
  @Input() existingItem: Item|Container|null = null;
  @Input() parent: Carrier | Container | null = null;
  @ViewChildren('formInput') inputs!: QueryList<ElementRef>;
  title: string = "Bad Modal"
  delete: string = "Bad Button"
  isContainer: boolean = false;
  searchTerm = '';
  showDropdown = false;
  filteredItemList: (Item | Container)[] = [];
  shakeSize = false;
  shakeCapacity = false;


  get itemList(): (Item | Container)[] {
    return this.isContainer
      ? this.db.containerTemplates
      : [...this.db.itemTemplates, ...this.db.herbTemplates];
  }
  dropdownReady = false;
  shakeInput = false;

  get containerItem(): Container {
    return this.bufferItem as any as Container;
  }

  constructor(public activeModal: NgbActiveModal, private db: TemplateService, private json: JsonService) {}

  ngOnInit() {
    setTimeout(() => {
      const first = this.inputs.first;
      if (first) {
        first.nativeElement.focus();
      }
    });
    this.bufferItem = this.isContainer
      ? this.emptyContainer.clone()
      : this.emptyItem.clone()
    if (this.existingItem) {
      this.isContainer = this.existingItem.isContainer();
      Object.assign(this.bufferItem, this.existingItem);
      console.log(this.isContainer)
      this.title = this.isContainer ? 'Edit Container' : 'Edit Item';
      this.delete = "Delete"
    } else {
      this.title = this.isContainer ? 'New Container' : 'New Item';
      this.delete = "Clear"
    }
    this.filteredItemList = this.itemList;

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dropdownReady = true;
    });
  }
  //template logic

  @HostListener('document:mousedown', ['$event'])
  onOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.dropdown-wrapper');
    if (!clickedInside) {
      this.showDropdown = false;
    }
  }


  filterItemList(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filteredItemList = this.itemList.filter(item =>
      item.name.toLowerCase().includes(term) ||
      (item as any).group?.toLowerCase().includes(term)
    );
  }

  getGroup(item: Item | Container): string | null {
    return (item as any).group ?? null;
  }

  openDropdown(): void {
    this.showDropdown = true;
    this.filteredItemList = this.itemList;
  }

  selectItem(item: Item | Container): void {
    this.bufferItem = Object.assign(
      this.isContainer ? new Container('', 0, '', 0, []) : new Item('', 0, ''),
      item
    );
    this.searchTerm = item.name;
    this.showDropdown = false;
  }

  //button logic
  saveItem() {
    if (!this.parent) return;

    if (this.existingItem) {
      Object.assign(this.existingItem, this.bufferItem);
    } else {
      this.parent.items.push(this.bufferItem);
    }
    this.json.saveToCookies();
    this.close();
  }

  deleteItem() {
    if (!this.parent) {return;}
    if (this.existingItem){
    const index = this.parent.items.indexOf(this.existingItem);
    if (index !== -1) {
      this.parent.items.splice(index, 1);
      this.close();
    }}
    this.clearForm()
  }

  clearForm(){Object.assign(this.bufferItem, this.emptyItem);}


  close(){
    this.activeModal.close();
  }

  onEnter(event: Event, isLast: boolean = false) {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();

    const inputsArray = this.inputs.toArray();
    const currentIndex = inputsArray.findIndex(
      input => input.nativeElement === keyboardEvent.target
    );

    if (isLast || currentIndex === inputsArray.length - 1) {
      this.saveItem();
      return;
    }

    const next = inputsArray[currentIndex + 1];
    if (next) {
      next.nativeElement.focus();
    }
  }

  onItemSelected(event: any) {
    const template = event.value;
    console.log("Selected template:", template);
    Object.assign(this.bufferItem, template);
    console.log("Updated bufferItem:", this.bufferItem);
  }
  onKeyDown(event: KeyboardEvent, field: 'size' | 'capacity') {
    const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    const isNumber = /^[0-9]$/.test(event.key);

    if (!isNumber && !allowedKeys.includes(event.key)) {
      if (field === 'size') this.shakeSize = true;
      if (field === 'capacity') this.shakeCapacity = true;
      event.preventDefault();
    }
  }



  onAnimationEnd(field?: 'size' | 'capacity') {
    if (field === 'size') this.shakeSize = false;
    if (field === 'capacity') this.shakeCapacity = false;
  }
}
