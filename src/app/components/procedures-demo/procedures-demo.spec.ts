import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProceduresDemo } from './procedures-demo';

describe('ProceduresDemo', () => {
  let component: ProceduresDemo;
  let fixture: ComponentFixture<ProceduresDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProceduresDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ProceduresDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
