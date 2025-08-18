import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ExcelUploadService } from '../../service/excel-upload/excel-upload.service';
import { PrepItemDto } from '../../model/PrepItemDto';
import { EventPrepDto } from '../../model/EventPrepDto';
import { ExcelParserService } from '../../service/excel-parser/excel-parser.service';
import { Router } from '@angular/router';
import { ParsedSheetService } from '../../service/parsed-sheet-service/parsed-sheet.service';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class ExcelUploadComponent {
  selectedFile: File | null = null;
  fileName: string = '';
  sheetMap: Record<string, any[]> = {};
  selectedSheet: string = '';
  masterItems: PrepItemDto[] = [];
  eventItems: Record<string, EventPrepDto[]> = {};

  constructor(
    private excelService: ExcelUploadService,
    private parser: ExcelParserService,
    private router: Router,
    private parsedSheetService: ParsedSheetService
  ) {}

  async uploadFile(file: File): Promise<void> {
    try {
      const sheetMap = await this.parser.parseAllSheets(file);
      this.parsedSheetService.parsedSheets = sheetMap;
      this.parsedSheetService.selectedSheet =
        this.selectedSheet ?? Object.keys(sheetMap)[0];

      console.log('✅ Sheet map:', sheetMap);
      console.log('👉 Selected sheet:', this.parsedSheetService.selectedSheet);
      this.router.navigate(['/preview']);
    } catch (err) {
      console.error('❌ Failed to parse file:', err);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!input.files?.length) return;

    if (!file) {
      console.warn('⚠️ No file selected.');
      return;
    }
    this.uploadFile(file);

    const extensionMatch = file.name.match(/\.(xlsx|xls|csv)$/i);
    const isValid = !!extensionMatch;

    if (!isValid) {
      alert('Please select a valid Excel or CSV file.');
      this.selectedFile = file;
      this.fileName = file.name;
      this.fileName = '';
      input.value = '';
    }
  }
}
