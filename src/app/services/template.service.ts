import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as XLSX from 'xlsx';
import {Item} from '../entities/item';
import {Container} from '../entities/container';

@Injectable({ providedIn: 'root' })
export class TemplateService {
  itemTemplates: Item[] = [];
  containerTemplates: Container[] = [];
  herbTemplates: Item[] = [];

  constructor(private http: HttpClient) {
    this.loadTemplatesFromAssets();
  }

  private loadTemplatesFromAssets(): void {
    this.http.get('assets/data/ryuutama items.xlsx', { responseType: 'arraybuffer' })
      .subscribe(buffer => this.parseExcelBuffer(buffer));
  }

  private parseExcelBuffer(buffer: ArrayBuffer): void {
    const data = new Uint8Array(buffer);
    const workbook = XLSX.read(data, { type: 'array' });

    const itemsSheet = workbook.Sheets['Items'];
    const containersSheet = workbook.Sheets['Containers'];
    const herbsSheet = workbook.Sheets['Herbs'];

    if (!itemsSheet || !containersSheet || !herbsSheet) {
      console.error('One or more sheets are missing in the workbook:', workbook.SheetNames);
      return;
    }

    this.itemTemplates = this.parseStandardSheet(workbook.Sheets['Items']);
    this.containerTemplates = this.parseStandardSheet(workbook.Sheets['Containers'], true) as Container[];
    this.herbTemplates = this.parseHerbSheet(workbook.Sheets['Herbs']);
  }

  private parseStandardSheet(sheet: XLSX.WorkSheet, isContainer: boolean = false): Item[] {
    const raw = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });
    const result: Item[] = [];

    let currentGroup = 'Ungrouped';

    for (let i = 0; i < raw.length; i++) {
      const row = raw[i];

      const maybeGroup = row[0]?.toString().trim();
      if (maybeGroup) currentGroup = maybeGroup;

      const name = row[1]?.toString().trim();
      const size = parseInt(row[3]);
      const capacity = isContainer ? parseInt(row[4]) || 0 : 0;
      const descriptionParts = row.slice(4).filter(Boolean).map(v => v.toString().trim());
      const descStart = isContainer ? 5 : 4;
      const description = row.slice(descStart).filter(x => x).join(' - ');

      if (!name || isNaN(size)) continue;

      const base = isContainer
        ? new Container(name, size, description, capacity, [])
        : new Item(name, size, description);

      (base as any).group = currentGroup;
      result.push(base);
    }

    return isContainer ? result as Container[] : result as Item[];
  }


  private parseHerbSheet(sheet: XLSX.WorkSheet): Item[] {
    const rows = XLSX.utils.sheet_to_json<any[]>(sheet, { header: 1 });
    const headers = rows[0];
    const results: Item[] = [];

    for (const row of rows.slice(1)) {
      const name = row[0]?.toString().trim();
      if (!name) continue;

      const parts = row.slice(1).map((val, i) => {
        const key = headers[i + 1];
        return key && val ? `${key}: ${val}` : null;
      }).filter(Boolean);

      const description = parts.join(' - ');

      const herb = Object.assign(new Item('', 1, ''), {
        name,
        size: 1,
        description,
        group: 'Herbs'
      });

      results.push(herb);
    }

    return results;
  }
}
