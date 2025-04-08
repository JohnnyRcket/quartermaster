import {Item} from './item';
import {CarrierType} from './carrierType';
import {Container} from './container';

export class Carrier {
  id: string;
  name: string;
  capacity: number;
  items: Item[];
  type: CarrierType;

  constructor(id: string, name: string, capacity: number, items: Item[], type: CarrierType) {
    this.id = id;
    this.name = name;
    this.capacity = capacity;
    this.items = items;
    this.type = type;
  }

  getCurrentTotal(): number {
    return this.items.reduce((sum, item) => sum + item.size, 0);
  }

  containers(items: Item[]): Container[] {
    return this.items.filter(item => item instanceof Container) as Container[];
  }


}
