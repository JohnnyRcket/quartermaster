import {Carrier} from './entities/carrier';
import {CarrierType} from './entities/carrierType';
import {Container} from './entities/container';
import {Item} from './entities/item';

const item1 = new Item('1','Blade',3,"A sword")
const item2 = new Item('2','Clothes',3,"A basic outfit")
const item4 = new Item('4','Ration',1,"One day\'s worth of food")
const item5 = new Item('5','Ration',1,"One day\'s worth of food")
const item6 = new Item('6','Ration (x15)',15,"Fifteen day\'s worth of food")

const container1 = new Container('1','Backpack',3, "A backpack.", 5, [item4])
const container2 = new Container('2','Chest',5, "A chest.", 15, [item6])

const carrier1 = new Carrier (
   '1',
  'Character 1',
  12,
  [item1, item2, container1],
  CarrierType.Character
);

const carrier2 = new Carrier (
  '2',
  'Animal 1',
  15,
  [item5, container2],
  CarrierType.Animal
);

export const EXAMPLE_CARRIERS = [carrier1, carrier2]





