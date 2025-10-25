import { Component, Input } from '@angular/core';
import { PrepItemDto } from '../../model/PrepItemDto';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-prep-preview',
    imports: [CommonModule],
    templateUrl: './prep-preview.component.html',
    styleUrls: ['./prep-preview.component.scss']
})
export class PrepPreviewComponent {
  @Input() data: PrepItemDto[] = [];
  
}
