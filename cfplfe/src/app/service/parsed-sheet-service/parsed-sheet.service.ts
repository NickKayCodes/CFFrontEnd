import { Injectable } from '@angular/core';
import { ParsedSheet } from '../../model/ParsedSheet';
import { PrepItemDto } from '../../model/PrepItemDto';
import { EventPrepDto } from '../../model/EventPrepDto';

@Injectable({ providedIn: 'root' })
export class ParsedSheetService {
  parsedSheets: Record<string, ParsedSheet> = {};
  selectedSheet: string | null = null;
  sheetNames: string[] = [];

  clear(): void {
    this.parsedSheets = {};
    this.sheetNames = [];
    this.selectedSheet = null;
  }

  isPrepSheet(
    sheet: ParsedSheet | undefined
  ): sheet is { type: 'prep'; data: PrepItemDto[] } {
    return sheet?.type === 'prep';
  }
  isEventSheet(
    sheet: ParsedSheet | undefined
  ): sheet is { type: 'event'; data: EventPrepDto[] } {
    return sheet?.type === 'event';
  }

}
