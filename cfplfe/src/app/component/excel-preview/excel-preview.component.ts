import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { PrepPreviewComponent } from '../prep-preview/prep-preview.component';
import { EventPreviewComponent } from '../event-preview/event-preview.component';
import { ParsedSheetService } from '../../service/parsed-sheet-service/parsed-sheet.service';
import { PrepItemDto } from '../../model/PrepItemDto';
import { EventPrepDto } from '../../model/EventPrepDto';
import { ExcelUploadService } from '../../service/excel-upload/excel-upload.service';

@Component({
    selector: 'app-excel-preview',
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        PrepPreviewComponent,
        EventPreviewComponent,
    ],
    templateUrl: './excel-preview.component.html',
    styleUrls: ['./excel-preview.component.scss']
})
export class ExcelPreviewComponent implements OnInit {
  constructor(
    public parsedSheetService: ParsedSheetService,
    private router: Router,
    private excelUploadService: ExcelUploadService
  ) {}

  ngOnInit(): void {
    const sheets = this.parsedSheetService.parsedSheets;
    const selected = this.parsedSheetService.selectedSheet;
    this.parsedSheetService.sheetNames = Object.keys(sheets);

    if (!sheets || Object.keys(sheets).length === 0) {
      console.warn('⚠️ No sheets found. Redirecting...');
      this.router.navigate(['/upload']);
    }
  }

  get selectedSheet(): string | null {
    return this.parsedSheetService.selectedSheet;
  }

  get prepData(): PrepItemDto[] | null {
    const sheet = this.parsedSheetService.parsedSheets[this.selectedSheet!];
    if (!sheet) {
      return null;
    }

    if (this.parsedSheetService.isPrepSheet(sheet)) {
      return sheet.data;
    }

    return null;
  }

  get eventData(): EventPrepDto[] | null {
    const sheet = this.parsedSheetService.parsedSheets[this.selectedSheet!];

    if (this.parsedSheetService.isEventSheet(sheet)) {
      return sheet.data;
    }

    return null;
  }

  hasParsedSheets(): boolean {
    return Object.keys(this.parsedSheetService.parsedSheets).length > 0;
  }

  selectedFile: File | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
