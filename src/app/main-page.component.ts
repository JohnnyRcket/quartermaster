import { Component, inject, OnInit } from '@angular/core';
import { Item } from './entities/item';
import { Carrier } from './entities/carrier';
import { CarrierComponent } from './entities/carrier.component';
import { EXAMPLE_CARRIERS } from './example.data';
import { NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { ContainerModalComponent } from './modals/container-modal.component';
import { CharacterModalComponent } from './modals/character-modal.component';
import { AnimalModalComponent } from './modals/animal-modal.component';
import { ItemModalComponent } from './modals/item-modal.component';
import { NgbModal, NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ThemeService} from './services/theme.service';
import {Modal} from 'bootstrap'
import {EmitPackage} from './entities/emitPackage';
import {Container} from './entities/container';

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
    CdkDropListGroup
  ]
})
export class MainPageComponent implements OnInit {
  carriers: Carrier[] = EXAMPLE_CARRIERS;
  characters: Carrier[] = [];
  animals: Carrier[] = [];
  items: Item[] = [];
  container?: Container;
  goldAmount = 1572;
  expAmount = 350;

  constructor(private modalService: NgbModal, private themeService: ThemeService) {}

  ngOnInit() {
    this.sortCarriers();
  }

  ngAfterViewInit() {}

  //currently used to parse testdata, but eventually will be used for imports from json

  sortCarriers() {
    this.characters = [];
    this.animals = [];
    this.carriers.forEach(carrier => {
      if (carrier.type === 'Character') {
        this.characters.push(carrier);
      } else if (carrier.type === 'Animal') {
        this.animals.push(carrier);
      }
    });
  }

  openCharacterModal() {
    const modalRef = this.modalService.open(CharacterModalComponent);
  }

  openAnimalModal() {
    const modalRef = this.modalService.open(AnimalModalComponent);
  }

  openItemModal() {
    const modalRef = this.modalService.open(ItemModalComponent);
  }

  openContainerModal() {

  }


  onThemeSelect(theme: string): void {
    this.themeService.setTheme(theme);
  }


}
