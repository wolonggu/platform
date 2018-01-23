import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
@Injectable()
export class TmdbConfigService {
  constructor() {}

  get apiKey() {
    return environment['TMDB_API_KEY'];
  }
}
