import { TestBed } from '@angular/core/testing';

import { PokeGraphQLService } from './poke-graph-ql.service';

describe('PokeGraphQLService', () => {
  let service: PokeGraphQLService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeGraphQLService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
