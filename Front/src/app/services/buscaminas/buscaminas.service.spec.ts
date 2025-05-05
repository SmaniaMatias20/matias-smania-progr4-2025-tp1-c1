import { TestBed } from '@angular/core/testing';

import { BuscaminasService } from './buscaminas.service';

describe('BuscaminasService', () => {
  let service: BuscaminasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaminasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
