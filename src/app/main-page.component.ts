import {Component, OnInit} from '@angular/core';
import {Item} from './entities/item';
import {Carrier} from './entities/carrier';
import {CarrierComponent} from './entities/carrier.component';
import {EXAMPLE_CARRIERS, EXAMPLE_TOOLBOX} from './example.data';
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from '@angular/common';
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
import {JsonService} from './services/json.service';
import {WipeModalComponent} from './modals/wipe-modal.component';


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
    ErrorToastComponent,
    NgClass,
    NgSwitchDefault,
    NgSwitchCase,
    NgSwitch
  ],

})
export class MainPageComponent implements OnInit {
  carriers: Carrier[] = EXAMPLE_CARRIERS;
  items: Item[] = [];
  container?: Container;

  get currentTheme(): string {
    return this.themeService.currentTheme;
  }



  constructor(private modalService: NgbModal, public themeService: ThemeService, public json: JsonService) {}

  ngOnInit() {
    if (!this.json.loadFromCookies()) {
      this.json.loadData({
        characters: EXAMPLE_CARRIERS.filter(c => c.type === 'Character'),
        animals: EXAMPLE_CARRIERS.filter(c => c.type === 'Animal'),
        toolbox: new Carrier("Toolbox", 42069, [EXAMPLE_TOOLBOX], CarrierType.Tool)
      });
    }
  }


  ngAfterViewInit() {
    this.themeService.reassertTheme();
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

  reset() {
    const modalRef = this.modalService.open(WipeModalComponent);
    modalRef.componentInstance.mode = 'reset';
  }

  wipeData() {
    const modalRef = this.modalService.open(WipeModalComponent);
    modalRef.componentInstance.mode = 'wipe';
  }


}
