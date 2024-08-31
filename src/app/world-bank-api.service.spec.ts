import { TestBed } from '@angular/core/testing';

import { WorldBankAPIService } from './world-bank-api.service';

describe('WorldBankAPIService', () => {
  let service: WorldBankAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorldBankAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
