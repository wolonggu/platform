import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { TmdbService } from './tmdb.service';
import { TmdbConfigService } from '../../movies/services/tmdb-config.service';
describe('TmdbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TmdbService,
        TmdbConfigService,
        { provide: HttpClient, useValue: { get: jest.fn() } },
      ],
    });
  });

  it(
    'should be created',
    inject([TmdbService], (service: TmdbService) => {
      expect(service).toBeTruthy();
    })
  );
});
