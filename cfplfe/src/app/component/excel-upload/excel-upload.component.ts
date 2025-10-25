import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExcelUploadService } from '../../service/excel-upload/excel-upload.service';
import { PrepItemDto } from '../../model/PrepItemDto';
import { EventPrepDto } from '../../model/EventPrepDto';
import { ExcelParserService } from '../../service/excel-parser/excel-parser.service';
import { Router } from '@angular/router';
import { ParsedSheetService } from '../../service/parsed-sheet-service/parsed-sheet.service';
import { ExcelPreviewComponent } from '../excel-preview/excel-preview.component';

@Component({
  selector: 'app-excel-upload',
  templateUrl: './excel-upload.component.html',
  styleUrls: ['./excel-upload.component.scss'],
  standalone: true,
  imports: [CommonModule, ExcelPreviewComponent, FormsModule],
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
    public parsedSheetService: ParsedSheetService,
    private cdr: ChangeDetectorRef,

  ) {}

  async displayFile(file: File): Promise<void> {
    try {
      const sheetMap = await this.parser.parseAllSheets(file);
      const sheetNames = Object.keys(sheetMap);

      this.parsedSheetService.parsedSheets = sheetMap;
      this.parsedSheetService.sheetNames = sheetNames;
      this.parsedSheetService.selectedSheet = sheetNames[0]; // ✅ always valid
    } catch (err) {
      console.error('❌ Failed to parse file:', err);
    }
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!input.files?.length) return;

    if (!file) {
      console.warn('⚠️ No file selected.');
      return;
    }

    const extensionMatch = file.name.match(/\.(xlsx|xls|csv)$/i);
    const isValid = !!extensionMatch;

    if (!isValid) {
      alert('Please select a valid Excel or CSV file.');
      // clear any previous selection
      this.selectedFile = null;
      this.fileName = '';
      input.value = '';
      return;
    }

    // reflect the selected file in the UI immediately
    this.selectedFile = file;
    this.fileName = file.name;

    // parse/upload in background and update parsed sheets
    await this.displayFile(file);

    // ensure template updates if change detection needs a kick
    try {
      this.cdr.detectChanges();
    } catch (e) {
      /* noop */
    }
  }

  hasParsedSheets(): boolean {
    return Object.keys(this.parsedSheetService.parsedSheets).length > 0;
  }

  uploadFile(): void {
    if (!this.selectedFile) return;

    this.excelService.uploadExcel(this.selectedFile).subscribe({
      next: (res) => {
        console.log('Upload successful:', res);

        const sheetName = res.sheetName;
        const parsedData = res.parsedData;
        const sheetType = res.type;

        this.parsedSheetService.parsedSheets[sheetName] = {
          type: sheetType,
          data: parsedData,
        };

        this.parsedSheetService.selectedSheet = sheetName;
        this.parsedSheetService.sheetNames = Object.keys(
          this.parsedSheetService.parsedSheets
        );

        // Optionally trigger a visual refresh
        console.log('🧠 Sheet registered:', sheetName);
      },
      error: (err) => {
        console.error('Upload failed:', err);
      },
    });
  }
}
