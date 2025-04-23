import { Injectable } from '@angular/core';
import { Carrier } from '../entities/carrier';
import { ANIMALS, CHARACTERS } from '../main-page.component';

export interface PartyData {
  characters: Carrier[];
  animals: Carrier[];
  toolbox?: Carrier;
}

@Injectable({ providedIn: 'root' })
export class JsonService {
  activeInventory: PartyData = {
    characters: structuredClone(CHARACTERS),
    animals: structuredClone(ANIMALS),
    toolbox: undefined,
  };

  import(json: string) {
    this.activeInventory = JSON.parse(json);
  }

  export(): string {
    return JSON.stringify(this.activeInventory, null, 2);
  }

  reset() {
    this.activeInventory = {
      characters: structuredClone(CHARACTERS),
      animals: structuredClone(ANIMALS),
      toolbox: undefined,
    };
  }

  exportPrettyFormat(): string {
    const data = this.activeInventory;
    const lines: string[] = [];

    const formatItem = (item: any, indent = '  ') => {
      if (item.items?.length) {
        const used = item.items.reduce((sum: number, i: any) => sum + i.size, 0);
        lines.push(`${indent}- ${item.name} (${used}/${item.capacity})`);
        item.items.forEach((nested: any) => formatItem(nested, indent + '  '));
      } else {
        lines.push(`${indent}- ${item.name} (${item.size})`);
      }
    };

    const processCarrier = (carrier: any, label: string) => {
      const used = carrier.items.reduce((sum: number, i: any) => sum + i.size, 0);
      lines.push(`${label}: ${carrier.name} (${used}/${carrier.capacity})`);
      carrier.items.forEach((item: any) => formatItem(item));
      lines.push('');
    };

    data.characters.forEach((c: any) => processCarrier(c, 'Character'));
    data.animals.forEach((a: any) => processCarrier(a, 'Animal'));

    return lines.join('\n').trim();
  }

  saveToCookies() {

  }

  loadFromCookies() {

  }
}
