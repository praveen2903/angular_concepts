import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncMachineCodes } from './async-machine-codes';

describe('AsyncMachineCodes', () => {
  let component: AsyncMachineCodes;
  let fixture: ComponentFixture<AsyncMachineCodes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsyncMachineCodes],
    }).compileComponents();

    fixture = TestBed.createComponent(AsyncMachineCodes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
