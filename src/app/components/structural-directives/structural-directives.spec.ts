import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralDirectives } from './structural-directives';

describe('StructuralDirectives', () => {
  let component: StructuralDirectives;
  let fixture: ComponentFixture<StructuralDirectives>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StructuralDirectives],
    }).compileComponents();

    fixture = TestBed.createComponent(StructuralDirectives);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
