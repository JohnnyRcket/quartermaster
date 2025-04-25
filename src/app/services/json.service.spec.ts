import { TestBed } from '@angular/core/testing';
import { JsonService } from './json.service';

describe('JsonService', () => {
  let service: JsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsonService);
  });

  it('should load data with characters, animals, toolbox, gold, and exp', () => {
    service.loadData({
      characters: [{ name: 'A', size: 1, description: '', items: [], type: 'Character' }],
      animals: [{ name: 'B', size: 1, description: '', items: [], type: 'Animal' }],
      toolbox: [],
      gold: '42',
      exp: '99'
    });

    expect(service.activeInventory.characters.length).toBe(1);
    expect(service.activeInventory.animals.length).toBe(1);
    expect(service.activeInventory.toolbox?.items.length).toBe(0);
    expect(service.activeInventory.gold).toBe('42');
    expect(service.activeInventory.exp).toBe('99');
  });

  it('should not throw on invalid JSON in import()', () => {
    expect(() => service.import('{this is not valid JSON}')).not.toThrow();
  });

  it('should export and re-import matching data', () => {
    const original = {
      characters: [{ name: 'C', size: 1, description: '', items: [], type: 'Character' }],
      animals: [],
      toolbox: [],
      gold: '100',
      exp: '7'
    };

    service.loadData(original);
    const exported = service.export();
    service.import(exported);

    expect(service.activeInventory.characters[0].name).toBe('C');
    expect(service.activeInventory.gold).toBe('100');
  });

  it('should not include item ids in exportRawFormat()', () => {
    service.loadData({
      characters: [],
      animals: [],
      toolbox: [{
        name: 'Potion',
        size: 1,
        description: '',
        id: 'should-be-gone'
      }],
      gold: '10',
      exp: '5'
    });

    const raw = service.exportRawFormat();
    const item = raw.toolbox[0];
    expect('id' in item).toBe(false);
  });

  it('should handle legacy toolbox object shape', () => {
    const legacy = {
      characters: [],
      animals: [],
      toolbox: { items: [{ name: 'Torch', size: 1, description: '' }] },
      gold: '0',
      exp: '0'
    };

    service.loadData(legacy);
    expect(service.activeInventory.toolbox?.items[0].name).toBe('Torch');
  });
});
