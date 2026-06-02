import { TestBed } from '@angular/core/testing';

import { ModelDemo } from './model-demo';

describe('ModelDemo', () => {
  let service: ModelDemo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModelDemo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
