import {Container} from './container';

export class Item {
  id: string;
  name: string;
  size: number;
  description: string;

  constructor(id: string, name: string, size: number, description: string) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.description = description;
  }

  isContainer(item: Item): boolean {
    try {
    return item instanceof Container;
    }
    catch (error) {
      return false
    }

  }
}
