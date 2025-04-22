import {Component, ElementRef, Input, QueryList, ViewChildren} from '@angular/core';
import {Item} from '../entities/item';
import {FormsModule} from '@angular/forms';
import {Carrier} from '../entities/carrier';
import {NgbActiveModal, NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {Container} from '../entities/container';
import {NgIf} from '@angular/common';
import {EXAMPLE_ITEMS} from '../example.data';
import {SelectDropDownModule} from 'ngx-select-dropdown';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-item-modal',
  standalone: true,
  templateUrl: `./item-modal.component.html`,
  styleUrls: ['../bootstrap/css/bootstrap.min.css', '../css/Footer-Basic-icons.css', '../css/bs-theme-overrides.css'],
  imports: [
    FormsModule, NgbModalModule, NgIf, SelectDropDownModule
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
  itemList: Item[] = EXAMPLE_ITEMS
  dropdownReady = false;
  get containerItem(): Container {
    return this.bufferItem as any as Container;
  }

  constructor(public activeModal: NgbActiveModal) {}

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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.dropdownReady = true;
    });
  }

  saveItem() {
    if (!this.parent) return;

    if (this.existingItem) {
      Object.assign(this.existingItem, this.bufferItem);
    } else {
      this.parent.items.push(this.bufferItem);
    }

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

  filterDigitsOnly(event: KeyboardEvent) {
    const allowedKeys = [
      'Backspace',
      'ArrowLeft',
      'ArrowRight',
      'Tab',
      'Delete',
      'Enter'
    ];

    const isDigit = /^[0-9]$/.test(event.key);

    if (!isDigit && !allowedKeys.includes(event.key)) {
      event.preventDefault();
      this.provideFeedback();
    }
  }

  provideFeedback() {
    if (navigator.vibrate) {
      navigator.vibrate(50); // 50ms vibration
    }
  }
}
