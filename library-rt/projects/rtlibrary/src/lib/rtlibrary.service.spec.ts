import { TestBed } from '@angular/core/testing';

import { RtlibraryService } from './rtlibrary.service';

describe('RtlibraryService', () => {
  let service: RtlibraryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtlibraryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
