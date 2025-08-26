import { Component, Input } from '@angular/core';
import { EventPrepDto } from '../../model/EventPrepDto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-event-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss'],
})
export class EventPreviewComponent {
  @Input() data: EventPrepDto[] = [];
}