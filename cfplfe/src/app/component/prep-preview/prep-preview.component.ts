import { Component, Input } from '@angular/core';
import { PrepItemDto } from '../../model/PrepItemDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prep-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prep-preview.component.html',

})
export class PrepPreviewComponent {
  @Input() data: PrepItemDto[] = [];

}