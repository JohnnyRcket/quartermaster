import {Carrier} from './entities/carrier';
import {CarrierType} from './entities/carrierType';
import {Container} from './entities/container';
import {Item} from './entities/item';

const item1 = new Item('Blade', 3, "A sword")
const item2 = new Item('Clothes', 3, "A basic outfit")
const item3 = new Item('Shield', 0, "Protecc")
const item4 = new Item('Ration', 1, "One day\'s worth of food")
const item5 = new Item('Ration', 1, "One day\'s worth of food")
const item6 = new Item('Ration (x15)', 15, "Fifteen day\'s worth of food")
const item7 = new Item('Rain Boots', 1, "splish splosh")
const item8 = new Item('Walking Stick', 1, "tap tap")
const item9 = new Item('Cap', 1, "put it on yer head")
const item10 = new Item('Goggles', 0, "every day i'm gogglin")

const container1 = new Container('Backpack', 3, "A backpack.", 5, [item4])
const container2 = new Container('Chest', 5, "A chest.", 15, [item6])

const carrier1 = new Carrier('Character 1', 12, [item1, item2, container1], CarrierType.Character);
const carrier2 = new Carrier('Animal 1', 15, [item5, container2], CarrierType.Animal);

export const EXAMPLE_CARRIERS = [carrier1, carrier2]
export const EXAMPLE_ITEMS: Item[] = [item1, item2, item3, item7, item8, item9, item10]
export const EXAMPLE_TOOLBOX: Item = new Item('Ration', 1, "One day\'s worth of food")





