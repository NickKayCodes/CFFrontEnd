import { Component } from '@angular/core';
import { ExcelUploadService } from '../../service/excel-upload.service';
import { CommonModule } from '@angular/common';

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

  constructor(private excelService: ExcelUploadService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const extensionMatch = file.name.match(/\.(xlsx|xls|csv)$/i);
    const isValid = !!extensionMatch;

    if (!isValid) {
      alert('Please select a valid Excel or CSV file.');
      this.selectedFile = file;
      this.fileName = file.name;
      this.fileName = '';
      input.value = '';
    }

     this.selectedFile = file;
     this.fileName = file.name;
  }

  uploadFile(): void {
    if (this.selectedFile) {
      this.excelService.uploadExcel(this.selectedFile).subscribe({
        next: (response) => console.log('Upload successful:', response),
        error: (err) => console.error('Upload failed:', err),
      });
    }
  }
}
