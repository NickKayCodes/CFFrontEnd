import { TestBed } from '@angular/core/testing';

import { ParsedSheetService } from './parsed-sheet.service';

describe('ParsedSheetService', () => {
  let service: ParsedSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParsedSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
