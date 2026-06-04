import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAutocomplete } from './search-autocomplete';

describe('SearchAutocomplete', () => {
  let component: SearchAutocomplete;
  let fixture: ComponentFixture<SearchAutocomplete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchAutocomplete],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchAutocomplete);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
