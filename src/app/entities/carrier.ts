import {Item} from './item';
import {CarrierType} from './carrierType';
import {Container} from './container';
import { v4 as uuidv4 } from 'uuid';

export class Carrier {
  id: string;
  name: string;
  capacity: number;
  items: Item[];
  type: CarrierType;

  constructor(name: string, capacity: number, items: Item[], type: CarrierType) {
    this.id = uuidv4();
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
