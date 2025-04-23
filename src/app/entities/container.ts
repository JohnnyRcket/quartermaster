import {Item} from './item';

export class Container extends Item {
  capacity: number;
  items: Item[] = [];

  constructor(name: string, size: number, description: string, capacity: number, items: Item[]) {
    super(name, size, description)
    this.capacity = capacity
    this.items = items
  }
  getCurrentTotal(): number {
    return this.items.reduce((sum, item) => sum + item.size, 0);
  }

  override clone(): Container {
    return new Container(this.name, this.size, this.description, this.capacity, []);
  }
}
