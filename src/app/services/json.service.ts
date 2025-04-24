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
  gold: string;
  exp: string;
}

@Injectable({ providedIn: 'root' })
export class JsonService {
  activeInventory: PartyData = {
    characters: [],
    animals: [],
    toolbox: new Carrier('Toolbox', 42069, [EXAMPLE_TOOLBOX], CarrierType.Tool),
    gold: '1,337',
    exp: '245'
  };

  import(json: string) {
    this.activeInventory = JSON.parse(json);
  }

  export(): string {
    return JSON.stringify(this.activeInventory, null, 2);
  }

  reset() {
    this.activeInventory = {
      characters: EXAMPLE_CARRIERS
        .filter(c => c.type === 'Character')
        .map(c => this.rehydrateCarrier(c)),
      animals: EXAMPLE_CARRIERS
        .filter(c => c.type === 'Animal')
        .map(c => this.rehydrateCarrier(c)),
      toolbox: this.rehydrateCarrier(
        new Carrier('Toolbox', 42069, [EXAMPLE_TOOLBOX], CarrierType.Tool)
      ),
      gold: '1,337',
      exp: '245'
    };
    this.saveToCookies();
  }

  exportPrettyFormat(): string {
    const data = this.activeInventory;
    const lines: string[] = [];

    const formatItem = (item: any, indent = '  ') => {
      const linePrefix = `${indent}${item.size} - ${item.name}`;
      if (item.items?.length) {
        const used = item.items.reduce((sum: number, i: any) => sum + i.size, 0);
        const isOverburdened = used > item.capacity;
        const bracket = isOverburdened ? ['{', '}'] : ['(', ')'];
        lines.push(`${linePrefix} ${bracket[0]}${used}/${item.capacity}${bracket[1]}`);
        item.items.forEach((nested: any) => formatItem(nested, indent + '  '));
      } else {
        lines.push(linePrefix);
      }
    };

    // Gold + EXP
    if (data.gold !== '0' || data.exp !== '0') {
      lines.push(`GOLD: ${data.gold}`);
      lines.push(`EXP: ${data.exp}`);
      lines.push('');
    }

    // Characters
    if (data.characters.length > 0) {
      lines.push('CHARACTERS');
      lines.push('-------------');
      data.characters.forEach(c => {
        const used = c.items.reduce((sum: number, i: any) => sum + i.size, 0);
        const isOverburdened = used > c.capacity;
        const bracket = isOverburdened ? ['{', '}'] : ['(', ')'];
        lines.push(`${c.name} ${bracket[0]}${used}/${c.capacity}${bracket[1]}`);
        c.items.forEach(item => formatItem(item));
        lines.push('');
      });
    }

    // Animals
    if (data.animals.length > 0) {
      lines.push('ANIMALS');
      lines.push('-------------');
      data.animals.forEach(a => {
        const used = a.items.reduce((sum: number, i: any) => sum + i.size, 0);
        const isOverburdened = used > a.capacity;
        const bracket = isOverburdened ? ['{', '}'] : ['(', ')'];
        lines.push(`${a.name} ${bracket[0]}${used}/${a.capacity}${bracket[1]}`);
        a.items.forEach(item => formatItem(item));
        lines.push('');
      });
    }

    return lines.join('\n');
  }



  loadData(data: any): void {
    const existingToolbox = this.activeInventory.toolbox ?? new Carrier('Toolbox', 42069, [], CarrierType.Tool);
    existingToolbox.items = (data.toolbox || []).map((i: any) => this.parseItem(i));
    this.activeInventory = {
      characters: (data.characters || []).map((c: any) => this.rehydrateCarrier(c)),
      animals: (data.animals || []).map((a: any) => this.rehydrateCarrier(a)),
      toolbox: existingToolbox,
      gold: data.gold ?? '0',
      exp: data.exp ?? '0'
    };
    this.saveToCookies();
  }


  private parseItem(i: any): Item {
    if ('capacity' in i) {
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
      toolbox: this.activeInventory.toolbox?.items.map(i => this.exportItem(i)) ?? [],
      gold: this.activeInventory.gold,
      exp: this.activeInventory.exp
    };
  }

  private exportCarrier(c: Carrier): any {
    return {
      name: c.name,
      capacity: c.capacity,
      type: c.type,
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

  wipeAllData(): void {
    localStorage.removeItem('partyData');

    this.activeInventory = {
      characters: [],
      animals: [],
      toolbox: new Carrier("Toolbox", 42069, [], CarrierType.Tool),
      gold: "0",
      exp: "0",
    };

    this.saveToCookies();
  }

  private rehydrateItem(item: any): Item | Container {
    if ('capacity' in item) {
      const hydrated = new Container(item.name, item.size, item.description, item.capacity, []);
      hydrated.items = (item.items || []).map((i: any) => this.rehydrateItem(i));
      return hydrated;
    }
    return new Item(item.name, item.size, item.description);
  }

  rehydrateCarrier(data: any): Carrier {
    const type = data.type ?? CarrierType.Tool; // fallback to Character just in case
    if (!Object.values(CarrierType).includes(type)) {
      throw new Error(`Unsupported carrier type: ${type}`);
    }

    return new Carrier(
      data.name,
      data.capacity,
      (data.items || []).map((i: any) => this.parseItem(i)),
      type
    );
  }


}
