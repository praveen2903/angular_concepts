import { TestBed } from '@angular/core/testing';

import { AutoComplete } from './auto-complete';

describe('AutoCommplete', () => {
  let service: AutoComplete;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutoComplete);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
