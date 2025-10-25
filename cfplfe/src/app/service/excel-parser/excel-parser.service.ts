import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { PrepItemDto } from '../../model/PrepItemDto';
import { EventPrepDto } from '../../model/EventPrepDto';

type SheetType = 'prep' | 'event';
type ParsedSheet = { type: SheetType; data: any[] };

@Injectable({ providedIn: 'root' })
export class ExcelParserService {
  parsedSheets: Record<string, ParsedSheet> = {};
  selectedSheet: string | null = null;

  constructor() {}

  get sheetNames(): string[] {
    return Object.keys(this.parsedSheets);
  }

  get selectedData(): any[] | null {
    if (!this.selectedSheet) return null;
    const sheet = this.parsedSheets[this.selectedSheet];
    return sheet?.data ?? null;
  }

  get selectedType(): SheetType | null {
    if (!this.selectedSheet) return null;
    return this.parsedSheets[this.selectedSheet]?.type ?? null;
  }

  selectSheet(name: string): void {
    if (this.parsedSheets[name]) {
      this.selectedSheet = name;
    } else {
      console.warn(`Sheet "${name}" not found.`);
      this.selectedSheet = null;
    }
  }

  async parseAllSheets(file: File): Promise<Record<string, ParsedSheet>> {
    const workbook = await this.loadWorkbook(file);
    const sheetMap: Record<string, ParsedSheet> = {};

    workbook.SheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const rawRows: any[][] = XLSX.utils.sheet_to_json(worksheet, {
        header: 1,
        defval: null,
      });

      const type = this.detectSheetType(rawRows);
      const parser = this.getParser(type);
      const parsed = parser(rawRows);

      sheetMap[sheetName] = { type, data: parsed };
    });

    this.parsedSheets = sheetMap;
    this.selectedSheet = this.sheetNames[0] ?? null;
    

    return sheetMap;
  }

  private async loadWorkbook(file: File): Promise<XLSX.WorkBook> {
    const data = await file.arrayBuffer();
    return XLSX.read(data, { type: 'array' });
  }

  private detectSheetType(rows: any[][]): SheetType {
    const flat = rows.flat().map((cell) => String(cell || '').toLowerCase());
    if (flat.includes('venue') || flat.includes('event title')) return 'event';
    if (flat.includes('food item')) return 'prep';
    return 'prep'; // fallback
  }

  private getParser(type: SheetType): (rows: any[][]) => any[] {
    return type === 'prep'
      ? this.parsePrepSheet.bind(this)
      : this.parseEventSheet.bind(this);
  }

  private parsePrepSheet(rows: any[][]): PrepItemDto[] {
    const headerIndex = rows.findIndex((row) => row.includes('Food Item'));
    if (headerIndex === -1) return [];

    const headers = rows[headerIndex].map((h) => h?.trim() ?? '');
    const dataRows = rows.slice(headerIndex + 1);

    const result: PrepItemDto[] = [];
    let currentItem: PrepItemDto | null = null;

    for (const row of dataRows) {
      const foodItem = row[headers.indexOf('Food Item')];
      const category = row[headers.indexOf('Category')];
      const process = row[headers.indexOf('Process')] ?? '';

      if (foodItem) {
        if (currentItem) result.push(currentItem);
        currentItem = {
          category: category ?? '',
          foodItem: foodItem ?? '',
          component: row[headers.indexOf('Component')] ?? '',
          process: process,
          quantity: row[headers.indexOf('Quantity')] ?? '',
          packout: row[headers.indexOf('Packout')] ?? '',
        };
      } else if (currentItem) {
        currentItem.process += '\n' + process;
      }
    }

    if (currentItem) result.push(currentItem);
    return result;
  }

  private parseEventSheet(rows: any[][]): EventPrepDto[] {
    const headerIndex = rows.findIndex((row) => row.includes('Food Item'));
    if (headerIndex === -1) return [];

    const headers = rows[headerIndex].map((h) => h?.trim() ?? '');
    const dataRows = rows.slice(headerIndex + 1);

    return dataRows.map((row) =>
      headers.reduce((obj, key, i) => {
        obj[key] = row[i];
        return obj;
      }, {} as EventPrepDto)
    );
  }
}
