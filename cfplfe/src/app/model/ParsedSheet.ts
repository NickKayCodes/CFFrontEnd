import { PrepItemDto } from './../model/PrepItemDto';
import { EventPrepDto } from './../model/EventPrepDto';

export interface ParsedSheet {
  // Define properties of ParsedSheet here
  type: 'prep' | 'event';
  data: PrepItemDto[] | EventPrepDto[];
}
