
import { CommonModule, formatCurrency } from '@angular/common';
import { Component, Input} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventPreviewComponent } from '../event-preview/event-preview.component';
import { PrepPreviewComponent } from '../prep-preview/prep-preview.component';


@Component({
  selector: 'app-sheet-preview',
  standalone: true,
  imports: [CommonModule, FormsModule, EventPreviewComponent, PrepPreviewComponent], // Add any necessary imports here, e.g. CommonModule
  templateUrl: './sheet-preview.component.html',
})
export class SheetPreviewComponent {
  @Input() sheetMap: Record<string, any[]> = {};
  selectedSheet: string = '';

  get sheetNames(): string[] {
    return Object.keys(this.sheetMap);
  }

  get isMasterSheet(): boolean {
    return this.selectedSheet === 'Master Prep List';
  }

  ngOnInit() {
    this.selectedSheet = this.sheetNames[0]; // default to first sheet
  }
}