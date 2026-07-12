import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentMachinecodes } from './parent-machinecodes';

describe('ParentMachinecodes', () => {
  let component: ParentMachinecodes;
  let fixture: ComponentFixture<ParentMachinecodes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParentMachinecodes],
    }).compileComponents();

    fixture = TestBed.createComponent(ParentMachinecodes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
