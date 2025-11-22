import { PrepItemDto } from './../model/PrepItemDto';
import { EventPrepDto } from './../model/EventPrepDto';
import { EventMetaDataDto } from './EventMetaDataDto';

export interface ParsedSheet {
  // Define properties of ParsedSheet here
  type: 'prep' | 'event';
  data: PrepItemDto[] | EventPrepDto[];
  metadata?: EventMetaDataDto;
}
