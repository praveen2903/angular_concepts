import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsValidations } from './reactive-forms-validations';

describe('ReactiveFormsValidations', () => {
  let component: ReactiveFormsValidations;
  let fixture: ComponentFixture<ReactiveFormsValidations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormsValidations],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormsValidations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
