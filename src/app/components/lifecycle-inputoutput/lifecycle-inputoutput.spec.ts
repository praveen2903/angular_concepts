import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifecycleInputoutput } from './lifecycle-inputoutput';

describe('LifecycleInputoutput', () => {
  let component: LifecycleInputoutput;
  let fixture: ComponentFixture<LifecycleInputoutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LifecycleInputoutput],
    }).compileComponents();

    fixture = TestBed.createComponent(LifecycleInputoutput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
