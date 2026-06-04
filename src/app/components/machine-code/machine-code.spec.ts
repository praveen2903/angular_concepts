import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineCode } from './machine-code';

describe('MachineCode', () => {
  let component: MachineCode;
  let fixture: ComponentFixture<MachineCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MachineCode],
    }).compileComponents();

    fixture = TestBed.createComponent(MachineCode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
