import {Carrier} from './entities/carrier';
import {CarrierType} from './entities/carrierType';
import {Container} from './entities/container';
import {Item} from './entities/item';

const item1 = new Item('Blade', 3, "A sword")
const item2 = new Item('Clothes', 3, "A basic outfit")
const item3 = new Item('Shield', 2, "Protecc")
const item4 = new Item('Ration', 1, "One day\'s worth of food")
const item5 = new Item('Ration', 1, "One day\'s worth of food")
const item6 = new Item('Ration (x15)', 15, "Fifteen day\'s worth of food")
const item7 = new Item('Rain Boots', 1, "splish splosh")
const item8 = new Item('Walking Stick', 1, "tap tap")
const item9 = new Item('Cap', 1, "put it on yer head")
const item10 = new Item('Goggles', 1, "every day i'm gogglin")
const item11 = new Item('Grandfather Clock', 5, "A well-crafted ornate luxury item, heavy but sturdy")
const item12 = new Item('Sleeping Bag', 1, "A small portable bed suitable for a single person")
const item13 = new Item('Wooden Utensils', 1, "Forks, spoons, etc. carved lovingly from wood.")
const item14 = new Item('Water Pouch', 1, "A pouch of leather that can hold a day’s ration of water")

const container1 = new Container('Backpack', 3, "A backpack.", 5, [item4])
const container2 = new Container('Chest', 5, "A chest.", 15, [item6])

const carrier1 = new Carrier('Andy', 12, [item1, item2, container1], CarrierType.Character);
const carrier2 = new Carrier('Ennui', 15, [item11, item12, item13, item14, item5, container2], CarrierType.Animal);

export const EXAMPLE_CARRIERS = [carrier1, carrier2]
export const EXAMPLE_ITEMS: Item[] = [item1, item2, item3, item7, item8, item9, item10]
export const EXAMPLE_TOOLBOX: Item = new Item('Ration', 1, "One day\'s worth of food")





