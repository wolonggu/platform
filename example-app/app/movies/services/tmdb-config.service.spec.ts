import { TestBed, inject } from '@angular/core/testing';

import { TmdbConfigService } from './tmdb-config.service';

describe('TmdbConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TmdbConfigService],
    });
  });

  it(
    'should be created',
    inject([TmdbConfigService], (service: TmdbConfigService) => {
      expect(service).toBeTruthy();
    })
  );
});
