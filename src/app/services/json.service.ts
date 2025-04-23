import {Injectable} from '@angular/core';
import {Carrier} from '../entities/carrier';
import {Item} from '../entities/item';
import {Container} from '../entities/container';
import {CarrierType} from '../entities/carrierType';
import {EXAMPLE_CARRIERS, EXAMPLE_TOOLBOX} from '../example.data';

export interface PartyData {
  characters: Carrier[];
  animals: Carrier[];
  toolbox?: Carrier;
}

@Injectable({ providedIn: 'root' })
export class JsonService {
  activeInventory: PartyData = {
    characters: [],
    animals: [],
    toolbox: new Carrier('Toolbox', 42069, [EXAMPLE_TOOLBOX], CarrierType.Tool),
  };

  import(json: string) {
    this.activeInventory = JSON.parse(json);
  }

  export(): string {
    return JSON.stringify(this.activeInventory, null, 2);
  }

  reset() {
    this.activeInventory = {
      characters: EXAMPLE_CARRIERS.filter(c => c.type === 'Character'),
      animals: EXAMPLE_CARRIERS.filter(c => c.type === 'Animal'),
      toolbox: new Carrier('Toolbox', 42069, [EXAMPLE_TOOLBOX], CarrierType.Tool)
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

  loadData(data: any): void {
    this.activeInventory = {
      characters: (data.characters || []).map((c: any) =>
        new Carrier(c.name, c.capacity, (c.items || []).map((i: any) => this.parseItem(i)), CarrierType.Character)
      ),
      animals: (data.animals || []).map((a: any) =>
        new Carrier(a.name, a.capacity, (a.items || []).map((i: any) => this.parseItem(i)), CarrierType.Animal)
      ),
      toolbox: Object.assign(new Carrier('', 0, [], CarrierType.Tool), data.toolbox)
    };
  }

  private parseItem(i: any): Item {
    if ('items' in i && 'capacity' in i) {
      return new Container(i.name, i.size, i.description, i.capacity, i.items.map((sub: any) => this.parseItem(sub)));
    } else {
      return new Item(i.name, i.size, i.description);
    }
  }

  saveToCookies(): void {
    const data = this.exportRawFormat();
    const encoded = encodeURIComponent(JSON.stringify(data));
    document.cookie = `partyData=${encoded}; path=/; max-age=31536000`; // 1 year
  }

  loadFromCookies(): boolean {
    const match = document.cookie.match(/(?:^|; )partyData=([^;]*)/);
    if (match) {
      try {
        const decoded = decodeURIComponent(match[1]);
        const parsed = JSON.parse(decoded);
        this.loadData(parsed);
        return true;
      } catch {
        console.warn('Invalid or corrupt cookie, ignoring.');
      }
    }
    return false;
  }

  exportRawFormat(): any {
    return {
      characters: this.activeInventory.characters.map(c => this.exportCarrier(c)),
      animals: this.activeInventory.animals.map(a => this.exportCarrier(a)),
      toolbox: this.activeInventory.toolbox?.items.map(i => this.exportItem(i)) ?? []

    };
  }

  private exportCarrier(c: Carrier): any {
    return {
      name: c.name,
      capacity: c.capacity,
      items: c.items.map(i => this.exportItem(i))
    };
  }

  private exportItem(i: Item): any {
    const base = {
      name: i.name,
      size: i.size,
      description: i.description
    };
    if (i instanceof Container) {
      return {
        ...base,
        capacity: i.capacity,
        items: i.items.map(sub => this.exportItem(sub))
      };
    }
    return base;
  }
}
