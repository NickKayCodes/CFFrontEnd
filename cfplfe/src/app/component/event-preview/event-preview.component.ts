import { Component, Input } from '@angular/core';
import { EventPrepDto } from '../../model/EventPrepDto';
import { CommonModule } from '@angular/common';
import { EventMetaDataDto } from '../../model/EventMetaDataDto';

@Component({
  selector: 'app-event-preview',
  imports: [CommonModule],
  templateUrl: './event-preview.component.html',
  styleUrls: ['./event-preview.component.scss'],
})
export class EventPreviewComponent {
  //event prep data input (food, prep, assigned to, category)
  @Input() data: EventPrepDto[] = [];

  //pull metadata 
  @Input() metadata?: EventMetaDataDto;
}
