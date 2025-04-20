import {Carrier} from './entities/carrier';
import {CarrierType} from './entities/carrierType';
import {Container} from './entities/container';
import {Item} from './entities/item';

const item1 = new Item('1','Blade',3,"A sword")
const item2 = new Item('2','Clothes',3,"A basic outfit")
const item3 = new Item('3','Shield',0,"Protecc")
const item4 = new Item('4','Ration',1,"One day\'s worth of food")
const item5 = new Item('5','Ration',1,"One day\'s worth of food")
const item6 = new Item('6','Ration (x15)',15,"Fifteen day\'s worth of food")
const item7 = new Item('7','Rain Boots',1,"splish splosh")
const item8 = new Item('8','Walking Stick',1,"tap tap")
const item9 = new Item('9','Cap',1,"put it on yer head")
const item10 = new Item('10','Goggles',0,"every day i'm gogglin")

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
export const EXAMPLE_ITEMS: Item[] = [item1, item2, item3, item7, item8, item9, item10]

export const EXAMPLE_TOOLBOX: Item = new Item('13','Ration',1,"One day\'s worth of food")





