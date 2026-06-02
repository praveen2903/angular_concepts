import { TestBed } from '@angular/core/testing';

import { ServicesDemo } from './services-demo';

describe('ServicesDemo', () => {
  let service: ServicesDemo;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesDemo);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
