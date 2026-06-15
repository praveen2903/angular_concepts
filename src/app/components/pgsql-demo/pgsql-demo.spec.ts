import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PgsqlDemo } from './pgsql-demo';

describe('PgsqlDemo', () => {
  let component: PgsqlDemo;
  let fixture: ComponentFixture<PgsqlDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PgsqlDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(PgsqlDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
