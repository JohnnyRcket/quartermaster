import { Item } from './item';

export class Container extends Item {
  capacity: number;
  items: Item[];
  constructor(id: string, name: string, size: number, description: string, capacity: number,
              items: Item[]) {
    super(id, name, size, description)
    this.capacity = capacity
    this.items = items
  }
  getCurrentTotal(): number {
    return this.items.reduce((sum, item) => sum + item.size, 0);
  }

}
