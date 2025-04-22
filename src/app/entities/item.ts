import { v4 as uuidv4 } from 'uuid';

export class Item {
  id: string;
  name: string;
  size: number;
  description: string;

  constructor(name: string, size: number, description: string) {
    this.id = uuidv4();
    this.name = name;
    this.size = size;
    this.description = description;
  }

  isContainer(): boolean { return this.constructor.name === 'Container'; }

  clone(): Item {
    return new Item(this.name, this.size, this.description);
  }
}
