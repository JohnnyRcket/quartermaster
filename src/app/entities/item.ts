import {v4 as uuidv4} from 'uuid';

export class Item {
  id: string;
  name: string;
  size: number;
  description: string;
  quantity: number;

  constructor(name: string, size: number, description: string, quantity?: number) {
    this.id = uuidv4();
    this.name = name;
    this.size = size;
    this.description = description;
    this.quantity = quantity ?? 1;
  }

  isContainer(): boolean {
    return false;
  }

  clone(): Item {
    return new Item(this.name, this.size, this.description, this.quantity);
  }
}
