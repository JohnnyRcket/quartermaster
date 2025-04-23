import {Component, OnInit} from '@angular/core';
import {Item} from './entities/item';
import {Carrier} from './entities/carrier';
import {CarrierComponent} from './entities/carrier.component';
import {EXAMPLE_CARRIERS} from './example.data';
import {NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CdkDropListGroup} from '@angular/cdk/drag-drop';
import {ItemModalComponent} from './modals/item-modal.component';
import {NgbModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ThemeService} from './services/theme.service';
import {Container} from './entities/container';
import {CarrierType} from './entities/carrierType';
import {CarrierModalComponent} from './modals/carrier-modal.component';
import {ToolboxComponent} from './toolbox.component';
import {ErrorToastComponent} from './modals/error-toast.component';
import {PortModalComponent} from './modals/port-modal.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './main-page.component.html',
  styleUrls: ['./bootstrap/css/bootstrap.min.css', './css/Footer-Basic-icons.css', './css/bs-theme-overrides.css'],
  imports: [
    CarrierComponent,
    NgForOf,
    NgbModule,
    NgbModalModule,
    FormsModule,
    CdkDropListGroup,
    ToolboxComponent,
    ErrorToastComponent
  ],

})
export class MainPageComponent implements OnInit {
  carriers: Carrier[] = EXAMPLE_CARRIERS;
  characters: Carrier[] = CHARACTERS;
  animals: Carrier[] = ANIMALS;
  items: Item[] = [];
  container?: Container;
  toolBoxCarrier: Carrier = new Carrier("toolbox", 1000, [], CarrierType.Tool)

  constructor(private modalService: NgbModal, private themeService: ThemeService) {}

  ngOnInit() {
    this.sortCarriers();
    console.log('Viewport width:', window.innerWidth);
  }

  ngAfterViewInit() {
  }

  //currently used to parse testdata, but eventually will be used for imports from json

  sortCarriers() {
    this.carriers.forEach(carrier => {
      if (carrier.type === 'Character') {
        CHARACTERS.push(carrier);
      } else if (carrier.type === 'Animal') {
        ANIMALS.push(carrier);
      }
    });
  }

  openImportModal() {
    const modalRef = this.modalService.open(PortModalComponent, {
      autoFocus: false
    } as any);
    modalRef.componentInstance.mode = 'import';
  }

  openExportModal() {
    const modalRef = this.modalService.open(PortModalComponent, {
      autoFocus: false
    } as any);
    modalRef.componentInstance.mode = 'export';
  }

  openCharacterModal() {
    const modalRef = this.modalService.open(CarrierModalComponent);
    modalRef.componentInstance.carrierType = CarrierType.Character;
  }

  openAnimalModal() {
    const modalRef = this.modalService.open(CarrierModalComponent);
    modalRef.componentInstance.carrierType = CarrierType.Animal;
  }

  openItemModal(carrier: Carrier) {
    const modalRef = this.modalService.open(ItemModalComponent);
    modalRef.componentInstance.carrier = carrier;
  }


  onThemeSelect(theme: string): void {
    this.themeService.setTheme(theme);
  }

  testClick(){
    console.log("theeeemes")
  }

}
export const ANIMALS: Carrier[] = [];
export const CHARACTERS: Carrier[] = [];
