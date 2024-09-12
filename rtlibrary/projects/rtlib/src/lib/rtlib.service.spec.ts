import { TestBed } from '@angular/core/testing';

import { RtlibService } from './rtlib.service';

describe('RtlibService', () => {
  let service: RtlibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtlibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
