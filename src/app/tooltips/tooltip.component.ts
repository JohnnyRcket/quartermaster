import { Component, Input } from '@angular/core';
import { Item } from '../entities/item';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['../bootstrap/css/bootstrap.min.css', '../css/Footer-Basic-icons.css', '../css/bs-theme-overrides.css'],
  imports: [
    NgIf
  ],
  standalone: true
})
export class TooltipComponent {
  @Input() item!: Item;
}
