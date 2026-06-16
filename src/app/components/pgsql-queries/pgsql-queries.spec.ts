import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgsqlQueries } from './pgsql-queries';

describe('PgsqlQueries', () => {
  let component: PgsqlQueries;
  let fixture: ComponentFixture<PgsqlQueries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgsqlQueries],
    }).compileComponents();

    fixture = TestBed.createComponent(PgsqlQueries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
